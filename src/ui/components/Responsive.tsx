import { useExtensionIsInTab } from '../features/browser/tabs';

export const AppDimensions = (props) => {
  const extensionIsInTab = useExtensionIsInTab();

  return (
    <div
      style={{
        width: extensionIsInTab ? '100vw' : '375px',
        height: extensionIsInTab ? '100vh' : '620px',
        minHeight: '620px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      {...props}
    />
  );
};
