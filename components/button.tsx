import { TouchableOpacity, Text } from 'react-native';

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
      className={`bg-white p-3 rounded-xl w-full items-center ${className}`}
      disabled={disabled}>
      <Text disabled={disabled} className="text-white">
        {text}
      </Text>
    </TouchableOpacity>
  );
}
