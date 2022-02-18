import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { SubmitButton } from '~/components/atoms/common/Button';
import { TextField, TextFieldMultiLine } from '~/components/atoms/forms/TextField';

import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { NovelDtoForMe } from '~/ranobe-net-api';

const EpisodeDataSchema = z.object({
  title: z.string().min(1, { message: 'タイトルは１文字以上必要です。' }),
  story: z.string().min(1, { message: '本文は１文字以上必要です。' }),
});
export type EpisodeData = z.infer<typeof EpisodeDataSchema>;

type EpisodeEditorProps = {
  novel: NovelDtoForMe;
  defaultValues?: EpisodeData;
  onClickOk: (data: EpisodeData) => void;
};

export const EpisodeEditor: React.VFC<EpisodeEditorProps> = ({ defaultValues, onClickOk }) => {
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
      ...defaultValues,
    },
    resolver: zodResolver(EpisodeDataSchema),
  });
  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  return (
    <form onSubmit={handleSubmit(onClickOk)}>
      <TextField inputProps={register('title')}>エピソードタイトル</TextField>
      <TextFieldMultiLine inputProps={register('story')}>本文</TextFieldMultiLine>
      <SubmitButton disabled={!isValid || !isDirty}>Ok</SubmitButton>
      <ErrorMessage errors={errors} name='title' />
      <ErrorMessage errors={errors} name='story' />
    </form>
  );
};
