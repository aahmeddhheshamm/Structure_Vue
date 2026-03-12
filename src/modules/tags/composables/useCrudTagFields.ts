import { computed, watch } from "vue";
import { useForm } from 'vee-validate';
import * as yup from "yup";
import { toast } from 'vue3-toastify';
import { useLocaleSettings } from "@/composables/useLocaleSettings.ts";
import useMutate from '@/composables/useMutate';
import type { ApiTagRequest } from "@/types/types.ts";
import { apiAddNewTag, apiEditTag } from "@/modules/tags/api";

export function useCrudTagFields(methodMode: string, data?: any, onSuccessCallback?: () => void) {
    const { t } = useLocaleSettings();

    const schema = computed(() => {
        return yup.object({
            name: yup.object({
                en: yup.string().required(t("validations.required", { field: t("fields.nameEn") })),
                ar: yup.string().required(t("validations.required", { field: t("fields.nameAr") })),
            }),
            type: yup.array().of(yup.number()).min(1, t('validations.required', { field: t('fields.tagType') })),
            is_active: yup.number().required(),
        });
    });

    const { handleSubmit, setValues, resetForm, values, errors } = useForm<ApiTagRequest>({
        validationSchema: schema,
        initialValues: {
            is_active: 1,
            name: { en: '', ar: '' },
            type: [],
            meta_description: null,
            meta_keywords: null,
            meta_title: null
        }
    });

    watch(data, (newData) => {
        if (newData && (methodMode === 'edit' || methodMode === 'view')) {
            const tag = newData.data || newData;

            setValues({
                name: {
                    en: tag?.name || '',
                    ar: '',
                },
                type: tag?.type || [],
                is_active: tag?.is_active ?? 1
            });
        }
    }, { immediate: true, deep: true });

    const getMutationFn = (vals: ApiTagRequest) => {
        const id = data?.value?.data?.id || data?.value?.id;
        return methodMode === 'edit' ? apiEditTag(vals, id) : apiAddNewTag(vals);
    };

    const { mutate, isPending } = useMutate({
        mutationKey: [methodMode === 'edit' ? 'edit-tag' : 'add-tag'],
        queryKey: ['dashboard/tags'],
        mutationFn: getMutationFn
    });

    const onSubmit = handleSubmit((formValues: ApiTagRequest) => {
        mutate(formValues, {
            onSuccess: () => {
                toast.success(t('messages.success'));
                if (onSuccessCallback) onSuccessCallback();
                resetForm();
            }
        });
    });

    return { onSubmit, isPending, values, errors };
}