import { TextInput as RNInput, TextInputProps as RNTextInputProps } from 'react-native';

type TextInputProps = Omit<RNTextInputProps, 'autoCapitalize'>;

export default function TextInput(props: TextInputProps) {
  return (
    <RNInput
      {...props}
      className="my-1 h-12 border w-full placeholder:text-zinc-400 bg-zinc-800 border-white rounded-md p-2 text-white"
    />
  );
}
