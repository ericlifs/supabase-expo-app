import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import tailshake from 'tailshake';
import colors from 'tailwindcss/colors';

type ButtonProps = {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
};

export default function Button({ text, onPress, className, disabled, loading }: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={tailshake(
        'bg-white p-3 rounded-xl w-full items-center justify-center disabled:bg-black',
        className
      )}
      disabled={disabled && !loading}>
      {loading ? (
        <ActivityIndicator color={colors.black} />
      ) : (
        <Text disabled={disabled} className="text-black disabled:text-white">
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
}
