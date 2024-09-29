import en from 'antd/es/locale/en_US';
import message from 'antd/lib/message';
import ReactDOM from 'react-dom/client';
import { IdleTimerProvider } from 'react-idle-timer';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

import browser from '@/background/webapi/browser';
import { EVENTS } from '@/shared/constant';
import eventBus from '@/shared/eventBus';
import { Message } from '@/shared/utils';
import AccountUpdater from '@/ui/state/accounts/updater';
// import { useAppDispatch, useAppSelector } from '@/ui/state/hooks';
import '@/ui/styles/global.css';

import { ActionComponentProvider } from './components/ActionComponent';
import { AppDimensions, AppSideDimensions } from './components/Responsive';
import AsyncMainRoute from './pages/MainRoute';
import store from './state';
import { WalletProvider } from './utils';

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
      refetchOnWindowFocus: false
    }
  }
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
  return <AccountUpdater />;
}

let root = document.getElementById('root') && ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
if (root) {
  root.render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <WalletProvider {...antdConfig} wallet={wallet as any}>
          <ActionComponentProvider>
            <AppDimensions>
              <IdleTimerProvider
                onAction={() => {
                  wallet.setLastActiveTime();
                }}>
                <Updaters />
                <AsyncMainRoute />
              </IdleTimerProvider>
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
              <IdleTimerProvider
                onAction={() => {
                  wallet.setLastActiveTime();
                }}>
                <Updaters />
                <AsyncMainRoute />
              </IdleTimerProvider>
            </AppSideDimensions>
          </ActionComponentProvider>
        </WalletProvider>
      </QueryClientProvider>
    </Provider>
  );
}
