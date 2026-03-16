import useMutate from '@/composables/useMutate'
import { useForm } from 'vee-validate'
import {useLocaleSettings} from "@/composables/useLocaleSettings.ts";
import * as yup from "yup";
import {computed} from "vue";
import {apiLogin} from "@/modules/auth/api";
import router from "@/router";
import {useAuthStore} from "@/store/auth.ts";
import type {ApiLoginRequest} from "@/types/UserData.ts";

export function useLoginForm() {
    const authStore = useAuthStore()
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

    const { handleSubmit, values, errors } = useForm<ApiLoginRequest>({
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

  const onSubmit = handleSubmit((values: ApiLoginRequest) => {
    mutate(
        {...values, type: 1},
      {
        onSuccess: (res) => {
            authStore.setToken(res?.data.token)
            authStore.setUserData(res?.data)
            router.push({name: 'admin-panel'})
        }
      }
    )
  })

  return { onSubmit, isPending, values, errors }
}
