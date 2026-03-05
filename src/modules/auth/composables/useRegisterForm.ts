import useMutate from '@/composables/useMutate'
// import { useToast } from '@/composables/useToast'
import { useForm } from 'vee-validate'
import {useLocaleSettings} from "@/composables/useLocaleSettings.ts";
import * as yup from "yup";
import {computed} from "vue";
import {apiRegister} from "@/modules/auth/api";

export function useRegisterForm() {
    // const { toast } = useToast()
    const { t } = useLocaleSettings();
    const schema = computed(() => {
        return yup.object({
            name: yup
                .string()
                .required(
                    t("validations.required", {
                        field: t("fields.name"),
                    })
                ),
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
            confirmPassword: yup.string().required(
                t("validations.required", {
                    field: t("fields.confirmPassword"),
                })
            ),
        });
    });

    const { handleSubmit, values, errors } = useForm<any>({
      validationSchema: schema,
    })

  const getMutationFn = () => {
      return apiRegister
  }

  const { mutate, isPending } = useMutate({
    mutationKey: ['register-form'],
    queryKey: ['register'],
    mutationFn: getMutationFn()
  })

  const onSubmit = handleSubmit((values) => {
    mutate(
      values,
      {
        onSuccess: () => {
        }
      }
    )
  })

  return { onSubmit, isPending, values, errors }
}
