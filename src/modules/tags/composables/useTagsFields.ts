import { ref } from 'vue'

export default function useTagsFields() {

    const fields = ref([
        {
            key: 'id',
            label: '#',
        },
        {
            key: 'name',
            label: 'Name',
            sortable: true,
        },
        {
            key: 'active_status',
            label: 'status',
        },
        {
            key: 'products_count',
            label: 'productsCount',
        },
        {
            key: 'created_at',
            label: 'createdAt',
            type: 'date',
        }
    ])

    return { fields }
}
