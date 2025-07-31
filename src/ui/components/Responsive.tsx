import { useExtensionIsInTab } from '../features/browser/tabs';

export const AppDimensions = (props) => {
  const extensionIsInTab = useExtensionIsInTab();

  return (
    <div
      style={{
        width: extensionIsInTab ? '100vw' : '360px',
        height: extensionIsInTab ? '100vh' : '600px',
        minHeight: '600px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
      }}
      {...props}
    />
  );
};

export const AppSideDimensions = (props) => {
  // const extensionIsInTab = useExtensionIsInTab();
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
      }}
      {...props}
    />
  );
};
