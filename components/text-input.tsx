import { TextInput as RNInput, TextInputProps as RNTextInputProps } from 'react-native';
import tailshake from 'tailshake';

type TextInputProps = Omit<RNTextInputProps, 'autoCapitalize'>;

export default function TextInput(props: TextInputProps) {
  return (
    <RNInput
      {...props}
      className={tailshake(
        'h-12 border w-full placeholder:text-zinc-400 bg-zinc-800 border-white rounded-md p-2 text-white',
        props.className
      )}
    />
  );
}
