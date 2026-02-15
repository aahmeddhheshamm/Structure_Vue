import {ref} from 'vue'

export default function useSuppliersFields() {

    const fields = ref([
        {
            key: 'id',
            label: '#',
        },
        {
            key: 'image',
            label: 'Image',
            type: 'image',
        },
        {
            key: 'name',
            label: 'Supplier Name',
        },
        {
            key: 'email',
            label: 'Email',
        },
        {
            key: 'phone',
            label: 'Phone',
        },
        {
            key: 'category',
            label: 'Category',
        },
        {
            key: 'date_of_establishment',
            label: 'Date of Establishment',
            type: 'date',
        },
        {
            key: 'status',
            label: 'Status',
        },
    ]);


    const actions = ref([
        {
            permission: '',
            icon:
                '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">\n' +
                '<path d="M8.00065 1.33398C6.25398 1.33398 4.83398 2.75398 4.83398 4.50065C4.83398 6.21398 6.17398 7.60065 7.92065 7.66065C7.97398 7.65398 8.02732 7.65398 8.06732 7.66065C8.08065 7.66065 8.08732 7.66065 8.10065 7.66065C8.10732 7.66065 8.10732 7.66065 8.11398 7.66065C9.82065 7.60065 11.1607 6.21398 11.1673 4.50065C11.1673 2.75398 9.74732 1.33398 8.00065 1.33398Z" fill="#606075"/>\n' +
                '<path d="M11.3866 9.43293C9.52664 8.19293 6.49331 8.19293 4.61997 9.43293C3.77331 9.9996 3.30664 10.7663 3.30664 11.5863C3.30664 12.4063 3.77331 13.1663 4.61331 13.7263C5.54664 14.3529 6.77331 14.6663 7.99997 14.6663C9.22664 14.6663 10.4533 14.3529 11.3866 13.7263C12.2266 13.1596 12.6933 12.3996 12.6933 11.5729C12.6866 10.7529 12.2266 9.99293 11.3866 9.43293Z" fill="#606075"/>\n' +
                '</svg>',
            text: 'View',
            action: (data) => {
                console.log('data of item', data)
            }
        },
        {
            permission: '',
            icon:
                '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">\n' +
                '<path d="M8.00065 1.33398C6.25398 1.33398 4.83398 2.75398 4.83398 4.50065C4.83398 6.21398 6.17398 7.60065 7.92065 7.66065C7.97398 7.65398 8.02732 7.65398 8.06732 7.66065C8.08065 7.66065 8.08732 7.66065 8.10065 7.66065C8.10732 7.66065 8.10732 7.66065 8.11398 7.66065C9.82065 7.60065 11.1607 6.21398 11.1673 4.50065C11.1673 2.75398 9.74732 1.33398 8.00065 1.33398Z" fill="#606075"/>\n' +
                '<path d="M11.3866 9.43293C9.52664 8.19293 6.49331 8.19293 4.61997 9.43293C3.77331 9.9996 3.30664 10.7663 3.30664 11.5863C3.30664 12.4063 3.77331 13.1663 4.61331 13.7263C5.54664 14.3529 6.77331 14.6663 7.99997 14.6663C9.22664 14.6663 10.4533 14.3529 11.3866 13.7263C12.2266 13.1596 12.6933 12.3996 12.6933 11.5729C12.6866 10.7529 12.2266 9.99293 11.3866 9.43293Z" fill="#606075"/>\n' +
                '</svg>',
            text: 'Edit',
            // action: (data) => {
            //     viewAction(data)
            // }
        },
        {
            permission: '',
            icon:
                '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">\n' +
                '<path d="M8.00065 1.33398C6.25398 1.33398 4.83398 2.75398 4.83398 4.50065C4.83398 6.21398 6.17398 7.60065 7.92065 7.66065C7.97398 7.65398 8.02732 7.65398 8.06732 7.66065C8.08065 7.66065 8.08732 7.66065 8.10065 7.66065C8.10732 7.66065 8.10732 7.66065 8.11398 7.66065C9.82065 7.60065 11.1607 6.21398 11.1673 4.50065C11.1673 2.75398 9.74732 1.33398 8.00065 1.33398Z" fill="#606075"/>\n' +
                '<path d="M11.3866 9.43293C9.52664 8.19293 6.49331 8.19293 4.61997 9.43293C3.77331 9.9996 3.30664 10.7663 3.30664 11.5863C3.30664 12.4063 3.77331 13.1663 4.61331 13.7263C5.54664 14.3529 6.77331 14.6663 7.99997 14.6663C9.22664 14.6663 10.4533 14.3529 11.3866 13.7263C12.2266 13.1596 12.6933 12.3996 12.6933 11.5729C12.6866 10.7529 12.2266 9.99293 11.3866 9.43293Z" fill="#606075"/>\n' +
                '</svg>',
            text: 'Delete',
            // action: (data) => {
            //     viewAction(data)
            // }
        }
    ])

    const sampleData = ref([
        {
            id: 1,
            name: 'Global Trade Co.',
            image: 'https://www.fullstackexperts.eu/wp-content/uploads/2024/12/Projekt-bez-nazwy-38-1024x1024.png',
            email: 'contact@globaltrade.com',
            phone: '+1 202-555-0181',
            category: 'Detergents',
            date_of_establishment: '2012-03-15',
            status: 'Active',
        },
        {
            id: 2,
            name: 'CleanPro Suppliers',
            image: 'https://d2gwgwt9a7yxle.cloudfront.net/what_is_user_id_in_net_banking_mobile_871b681e52.jpg',
            email: 'sales@cleanpro.com',
            phone: '+44 7700 900245',
            category: 'Household Cleaning',
            date_of_establishment: '2015-07-22',
            status: 'Active',
        },
        {
            id: 3,
            name: 'EcoHome Industries',
            image: 'https://assets.bizclikmedia.net/1800/b76651b4b22a369a0186c3744edc0116:9b2fd1e9d9424848ae526e612705088d/alex-chriss.png',
            email: 'info@ecohome.com',
            phone: '+49 151 23456789',
            category: 'Eco Products',
            date_of_establishment: '2018-01-10',
            status: 'Pending',
        },
        {
            id: 4,
            name: 'BrightChem Ltd.',
            image: 'https://www.afdelingonline.nl/wp-content/uploads/2022/10/Sander-Rondje.png',
            email: 'support@brightchem.com',
            phone: '+971 50 123 4567',
            category: 'Chemicals',
            date_of_establishment: '2010-11-05',
            status: 'Inactive',
        },
        {
            id: 5,
            name: 'UltraWash Corp.',
            image: 'https://www.coursebox.ai/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F3qyhkhue%2Fproduction%2F81d234e251ca8e2ca5dd1d81d476792128d714d7-190x190.webp%3Ffm%3Dwebp%26fit%3Dclip&w=3840&q=75',
            email: 'hello@ultrawash.com',
            phone: '+20 100 456 7890',
            category: 'Laundry Products',
            date_of_establishment: '2016-09-30',
            status: 'Active',
        },
    ]);


    return { fields, actions, sampleData }
}
