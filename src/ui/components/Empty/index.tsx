import { Image } from '@/ui/components/Image';

import { Text } from '../Text';

interface EmptyProps {
  text?: string;
}
export function Empty(props: EmptyProps) {
  const { text } = props;
  const content = text || 'No data';
  return (
    <div className="flex flex-col items-center gap-[10px]">
      <Image
        src={'./images/icons/main/no-data.svg'}
        size={64}
        style={{
          height: '80px'
        }}
      />
      <Text color={'grey2'} text={content} size="xs" textCenter />
    </div>
  );
}
