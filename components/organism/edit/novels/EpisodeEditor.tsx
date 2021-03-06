import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { SubmitButton } from '~/components/atoms/common/Button';
import { TextField, TextFieldMultiLine } from '~/components/atoms/forms/TextField';

import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { NovelDtoForMe } from '~/ranobe-net-api/@types';
import { useAtomValue } from 'jotai';
import { fontAtom } from '~/modules/theme/font';
import clsx from 'clsx';

const EpisodeDataSchema = z.object({
  title: z.string().min(1, { message: 'タイトルは1文字以上必要です。' }),
  story: z.string().min(1, { message: '本文は1文字以上必要です。' }),
  private: z.boolean(),
});
export type EpisodeData = z.infer<typeof EpisodeDataSchema>;

type EpisodeEditorProps = {
  novel: NovelDtoForMe;
  defaultValues?: EpisodeData;
  onSuccess: (data: EpisodeData) => void;
};

export const EpisodeEditor: React.VFC<EpisodeEditorProps> = ({ defaultValues, onSuccess }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, isDirty, errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: '',
      story: '',
      private: false,
      ...defaultValues,
    },
    resolver: zodResolver(EpisodeDataSchema),
  });
  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  const font = useAtomValue(fontAtom);

  return (
    <form onSubmit={handleSubmit(onSuccess)}>
      <TextField inputProps={register('title')}>エピソードタイトル</TextField>
      <ErrorMessage errors={errors} name='title' />
      <TextFieldMultiLine className={clsx('h-screen', font)} inputProps={register('story')}>
        本文
      </TextFieldMultiLine>
      <ErrorMessage errors={errors} name='story' />
      <SubmitButton disabled={!isValid || !isDirty}>Ok</SubmitButton>
    </form>
  );
};
