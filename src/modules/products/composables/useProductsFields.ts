import { ref } from 'vue'

export default function useProductsFields() {

    const fields = ref([
        {
            key: 'id',
            label: '#',
        },
        {
            key: 'company_image',
            label: 'Image',
            type: 'image',
        },
        {
            key: 'name',
            label: 'Name',
        },

        {
            key: 'package',
            label: 'Package',
        },
        {
            key: 'status',
            label: 'Status',
        },
        {
            key: 'hs_code',
            label: 'Hs code',
        },
        {
            key: 'hs_code_local',
            label: 'Hs code local',
        },
        {
            key: 'moq',
            label: 'MOQ',
        }
    ])

    return { fields }
}
