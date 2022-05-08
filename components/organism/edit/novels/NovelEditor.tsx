import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { SubmitButton } from '~/components/atoms/common/Button';
import { TextField, TextFieldMultiLine } from '~/components/atoms/forms/TextField';

import { zodResolver } from '@hookform/resolvers/zod';
import { CheckBox } from '~/components/atoms/forms/Checkbox';

const NovelDataSchema = z
  .object({
    title: z.string().min(1),
    description: z.string(),
    useAuthorName: z.boolean(),
    author: z.string(),
    links: z.array(
      z.object({
        name: z.string(),
        link: z.string(),
      })
    ),
    tags: z.array(
      z.object({
        tag: z.string(),
      })
    ),
    private: z.boolean(),
  })
  .refine(({ useAuthorName, author }) => !useAuthorName || (useAuthorName && author.length > 0));
export type NovelData = z.infer<typeof NovelDataSchema>;

export const NovelEditor: React.VFC<{ defaultValues?: NovelData; onClickOk: (user: NovelData) => void }> = ({
  defaultValues,
  onClickOk,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isValid, isDirty },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      useAuthorName: false,
      author: '',
      links: [],
      tags: [],
      private: false,
      ...defaultValues,
    },
    resolver: zodResolver(NovelDataSchema),
  });
  const useAuthorName = watch('useAuthorName', defaultValues?.useAuthorName ?? false);
  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  return (
    <form onSubmit={handleSubmit(onClickOk)}>
      <TextField inputProps={register('title', { minLength: 1 })}>タイトル</TextField>
      <TextFieldMultiLine inputProps={register('description')}>あらすじ</TextFieldMultiLine>
      <CheckBox inputProps={register('useAuthorName')}>作者名を変更する</CheckBox>
      {useAuthorName && <TextField inputProps={register('author', { minLength: 1 })}>作者名</TextField>}

      <SubmitButton disabled={!isValid || !isDirty}>Ok</SubmitButton>
    </form>
  );
};
