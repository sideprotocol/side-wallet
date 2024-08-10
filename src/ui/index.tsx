import en from 'antd/es/locale/en_US';
import message from 'antd/lib/message';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { useEffect, useState } from 'react'
import { useIdleTimer } from 'react-idle-timer'
import browser from '@/background/webapi/browser';
import { EVENTS } from '@/shared/constant';
import eventBus from '@/shared/eventBus';
import { Message } from '@/shared/utils';
import AccountUpdater from '@/ui/state/accounts/updater';
import '@/ui/styles/global.css';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ActionComponentProvider } from './components/ActionComponent';
import { AppDimensions, AppSideDimensions } from './components/Responsive';
import AsyncMainRoute from './pages/MainRoute';
import store from './state';
import { WalletProvider } from './utils';
import { globalActions } from '@/ui/state/global/reducer';
import { useAppDispatch, useAppSelector } from '@/ui/state/hooks';
import { SettingsState } from '@/ui/state/settings/reducer';

// disabled sentry
// Sentry.init({
//   dsn: 'https://15ca58bf532f4234a2f400cd11edfa2f@o4504750033403904.ingest.sentry.io/4505044300201984',
//   integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],
//   // Performance Monitoring
//   tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
//   // Session Replay
//   replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
//   replaysOnErrorSampleRate: 1.0 // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
// });

// import 'default-passive-events'

// const AsyncMainRoute = lazy(() => import('./pages/MainRoute'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

message.config({
  maxCount: 1
});
const antdConfig = {
  locale: en
};

// For fix chrome extension render problem in external screen
if (
  // From testing the following conditions seem to indicate that the popup was opened on a secondary monitor
  window.screenLeft < 0 ||
  window.screenTop < 0 ||
  window.screenLeft > window.screen.width ||
  window.screenTop > window.screen.height
) {
  browser.runtime.getPlatformInfo(function (info) {
    if (info.os === 'mac') {
      const fontFaceSheet = new CSSStyleSheet();
      fontFaceSheet.insertRule(`
        @keyframes redraw {
          0% {
            opacity: 1;
          }
          100% {
            opacity: .99;
          }
        }
      `);
      fontFaceSheet.insertRule(`
        html {
          animation: redraw 1s linear infinite;
        }
      `);
      (document as any).adoptedStyleSheets = [...(document as any).adoptedStyleSheets, fontFaceSheet];
    }
  });
}

const { PortMessage } = Message;

const portMessageChannel = new PortMessage();

portMessageChannel.connect('popup');

const wallet: Record<string, any> = new Proxy(
  {},
  {
    get(obj, key) {
      switch (key) {
        case 'openapi':
          return new Proxy(
            {},
            {
              get(obj, key) {
                return function (...params: any) {
                  return portMessageChannel.request({
                    type: 'openapi',
                    method: key,
                    params
                  });
                };
              }
            }
          );
          break;
        default:
          return function (...params: any) {
            return portMessageChannel.request({
              type: 'controller',
              method: key,
              params
            });
          };
      }
    }
  }
);

portMessageChannel.listen((data) => {
  if (data.type === 'broadcast') {
    eventBus.emit(data.method, data.params);
  }
});

eventBus.addEventListener(EVENTS.broadcastToBackground, (data) => {
  portMessageChannel.request({
    type: 'broadcast',
    method: data.method,
    params: data.data
  });
});

function Updaters() {
  const settingsState = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();
  // const timeout = settingsState.unLockTimeLimit * 60 * 1000
  const timeout = location.href.split('#')[1] !== '/account/unlock' ? settingsState.unLockTimeLimit * 60 * 1000 : 1000;
  const promptBeforeIdle = 0
  const [state, setState] = useState<string>('Active')
  const [remaining, setRemaining] = useState<number>(timeout)
  const [open, setOpen] = useState<boolean>(false)

  const onIdle = () => {
    setState('Idle');
    console.log(`settingsState: `, settingsState);
    // dispatch(globalActions.update({ isUnlocked: false }));
    // const basePath = location.href.split('#')[0];
    // location.href = `${basePath}#/account/unlock`;
  }

  const onActive = () => {
    setState('Active')
  }

  const onPrompt = () => {
    setState('Prompted')
  }

  const { getRemainingTime, activate } = useIdleTimer({
    onIdle,
    onActive,
    onPrompt,
    timeout,
    promptBeforeIdle,
    throttle: 500
  })

  useEffect(() => {
    const interval = setInterval(() => {
      // console.log(`Math.ceil(getRemainingTime() / 1000): `, Math.ceil(getRemainingTime() / 1000));
      setRemaining(Math.ceil(getRemainingTime() / 1000))
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  })
  // const handleStillHere = () => {
  //   activate()
  // }

  // const timeTillPrompt = Math.max(remaining - promptBeforeIdle / 1000, 0);
  // const seconds = timeTillPrompt > 1 ? 'seconds' : 'second';
  return (
    <>
      <AccountUpdater />
    </>
  );
}

// wallet.getLocale().then((locale) => {
//   addResourceBundle(locale).then(() => {
//     i18n.changeLanguage(locale);
//     // ReactDOM.render(<Views wallet={wallet} />, document.getElementById('root'));
//     const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
//     root.render(
//       <Provider store={store}>
//         <WalletProvider {...antdConfig} wallet={wallet as any}>
//           <AppDimensions>
//             <Updaters />
//             <AsyncMainRoute />
//           </AppDimensions>
//         </WalletProvider>
//       </Provider>
//     );
//   });
// });


let root = document.getElementById('root') && ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
if (root) {
  root.render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <WalletProvider {...antdConfig} wallet={wallet as any}>
          <ActionComponentProvider>
            <AppDimensions>
              <Updaters />
              <AsyncMainRoute />
            </AppDimensions>
          </ActionComponentProvider>
        </WalletProvider>
      </QueryClientProvider>
    </Provider>
  );
}

let root2 = document.getElementById('side') && ReactDOM.createRoot(document.getElementById('side') as HTMLElement);
if (root2) {
  root2.render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <WalletProvider {...antdConfig} wallet={wallet as any}>
          <ActionComponentProvider>
            <AppSideDimensions>
              <Updaters />
              <AsyncMainRoute />
            </AppSideDimensions>
          </ActionComponentProvider>
        </WalletProvider>
      </QueryClientProvider>
    </Provider>
  );
}




