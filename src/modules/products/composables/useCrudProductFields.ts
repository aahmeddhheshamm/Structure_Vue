import useMutate from '@/composables/useMutate'
import { useForm } from 'vee-validate'
import {useLocaleSettings} from "@/composables/useLocaleSettings.ts";
import * as yup from "yup";
import {computed} from "vue";
import router from "@/router";
import {apiAddNewProduct, apiEditProduct} from "@/modules/products/api";
import type {ApiProductRequest, ProductType} from "@/types/types.ts";

export function useCrudProductFields(methodMode: 'edit' | 'add', data?: ProductType) {
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
            price: yup.string().required(
                t("validations.required", {
                    field: t("fields.price"),
                })
            ),
            category: yup.string().required(
                t("validations.required", {
                    field: t("fields.category"),
                })
            ),
            sub_categories: yup.string().required(
                t("validations.required", {
                    field: t("fields.subCategories"),
                })
            ),
        });
    });

    const { handleSubmit, values, errors } = useForm<ApiProductRequest>({
        initialValues:
            methodMode === 'edit'
                ? {
                    name: data?.name || '',
                    price: data?.price || '',
                    category: data?.category || '',
                    sub_categories: data?.sub_categories || '',
                }
                : {},
        validationSchema: schema,
    })

    const getMutationFn = () => {
        if (methodMode === 'edit') {
            return (values: any) => apiEditProduct(values, data?.id)
        } else {
            return apiAddNewProduct
        }

    }

    const { mutate, isPending } = useMutate({
        mutationKey: [methodMode === 'edit' ? 'edit-product' : 'add-product'],
        queryKey: ['product'],
        mutationFn: getMutationFn()
    })

    const onSubmit = handleSubmit((values: ApiProductRequest) => {
        mutate(
            values,
            {
                onSuccess: (res) => {
                    router.push({name: 'admin-panel'})
                }
            }
        )
    })

    return { onSubmit, isPending, values, errors }
}
