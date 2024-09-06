import { Image } from '@/ui/components/Image';

import { Text } from '../Text';

interface EmptyProps {
  text?: string;
}
export function Empty(props: EmptyProps) {
  const { text } = props;
  const content = text || 'NO DATA';
  return (
    <div
      className="flex flex-col items-center gap-[10px]"
      style={
        {
          // display: 'flex',
          // flexDirection: 'col',
          // gap: spacing.small,
          // alignSelf: 'center'
        }
      }
    >
      <Image
        // src={'./images/img/no-data.gif'}
        src={'./images/icons/main/no-data.svg'}
        size={64}
        style={{
          height: '80px'
        }}
      />
      <Text color={'white'} text={content} preset="sub" textCenter />
    </div>
  );
}
