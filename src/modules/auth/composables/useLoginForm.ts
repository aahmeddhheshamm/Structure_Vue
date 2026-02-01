import useMutate from '@/composables/useMutate'
// import { useToast } from '@/composables/useToast'
import { useForm } from 'vee-validate'
import {useLocaleSettings} from "@/composables/useLocaleSettings.ts";
import * as yup from "yup";
import {computed} from "vue";
import {apiLogin} from "@/modules/auth/api";

export function useLoginForm() {
    // const { toast } = useToast()
    const { t } = useLocaleSettings();
    const schema = computed(() => {
        return yup.object({
            email: yup
                .string()
                .email(t("validations.email"))
                .required(
                    t("validations.required", {
                        field: t("fields.email"),
                    })
                ),
            password: yup.string().required(
                t("validations.required", {
                    field: t("fields.password"),
                })
            ),
        });
    });

    const { handleSubmit, values, errors } = useForm<any>({
      validationSchema: schema,
    })

  const getMutationFn = () => {
      return apiLogin
  }

  const { mutate, isPending } = useMutate({
    mutationKey: ['login-form'],
    queryKey: ['login-form'],
    mutationFn: getMutationFn()
  })

  const onSubmit = handleSubmit((values) => {
    console.log(values)
    mutate(
      values,
      {
        onSuccess: () => {
          // toast.success(`Course ${method === 'add' ? 'added' : 'edited'} successfully.`)
        }
      }
    )
  })

  return { onSubmit, isPending, values, errors }
}
