import { TouchableOpacity, Text } from 'react-native';
import tailshake from 'tailshake';

type ButtonProps = {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  className?: string;
};

export default function Button({ text, onPress, className, disabled }: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={tailshake(
        'bg-white p-3 rounded-xl w-full items-center disabled:bg-black',
        className
      )}
      disabled={disabled}>
      <Text disabled={disabled} className="text-black disabled:text-white">
        {text}
      </Text>
    </TouchableOpacity>
  );
}
