import { ref } from 'vue'

export default function useProductsFields() {

    const fields = ref([
        {
            key: '#',
            label: '#',
        },
        {
            key: 'time',
            label: 'Time',
            sortable: true,
        },
        {
            key: 'event',
            label: 'Event',
            sortable: true
        },
        {
            key: 'source',
            label: 'Source IP',
            sortable: true
        },
        {
            key: 'destination',
            label: 'Destination IP',
            sortable: true,
        },
        {
            key: 'subject',
            label: 'Subject',
            sortable: true
        },
        {
            key: 'hash',
            label: 'Hash',
        }
    ])

    const actions = ref([
        {
            permission: '',
            icon:
                '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">\n' +
                '<path d="M8.00065 1.33398C6.25398 1.33398 4.83398 2.75398 4.83398 4.50065C4.83398 6.21398 6.17398 7.60065 7.92065 7.66065C7.97398 7.65398 8.02732 7.65398 8.06732 7.66065C8.08065 7.66065 8.08732 7.66065 8.10065 7.66065C8.10732 7.66065 8.10732 7.66065 8.11398 7.66065C9.82065 7.60065 11.1607 6.21398 11.1673 4.50065C11.1673 2.75398 9.74732 1.33398 8.00065 1.33398Z" fill="#606075"/>\n' +
                '<path d="M11.3866 9.43293C9.52664 8.19293 6.49331 8.19293 4.61997 9.43293C3.77331 9.9996 3.30664 10.7663 3.30664 11.5863C3.30664 12.4063 3.77331 13.1663 4.61331 13.7263C5.54664 14.3529 6.77331 14.6663 7.99997 14.6663C9.22664 14.6663 10.4533 14.3529 11.3866 13.7263C12.2266 13.1596 12.6933 12.3996 12.6933 11.5729C12.6866 10.7529 12.2266 9.99293 11.3866 9.43293Z" fill="#606075"/>\n' +
                '</svg>',
            text: 'View',
            // action: (data) => {
            //     viewAction(data)
            // }
        }
    ])

    const sampleData = ref([
        {
            '#': 1,
            time: '2024-06-05 08:35:21',
            event: 'Suspicious login detected from new device',
            source: '192.168.1.10',
            destination: 'John Doe',
            subject: 'Phishing - Credential Harvesting',
            hash: 'e2a15f8c2d8b4a94c1123b174f96e67b7b2e6d803925c0991048cd89cde1234'
        },
        {
            '#': 2,
            time: '2024-07-03 15:12:54',
            event: 'Multiple failed password attempts',
            source: '192.168.1.25',
            destination: 'Jane Smith',
            subject: 'Phishing - Malware Attachment',
            hash: '885ea30251a7deaf3849f3a6c0d7e63b4017e8fe12f4c820b1ee023a9e8fbe77'
        },
        {
            '#': 3,
            time: '2024-05-22 13:30:17',
            event: 'Alert: Unusual outbound traffic',
            source: '10.1.100.4',
            destination: 'Alice Johnson',
            subject: 'Phishing - Fake Invoice',
            hash: 'c3bd7e9a2b7d472fca6dbcd355adad2c7983b165db1195880a5db4ceed070aff'
        },
        {
            '#': 4,
            time: '2024-04-16 10:24:59',
            event: 'File uploaded with malware signature',
            source: '10.1.20.87',
            destination: 'Bob Williams',
            subject: 'Phishing - Account Suspension Notice',
            hash: 'ae0d1d2fb9143f53f48c582a40a5190541b8e02c8b940ad0437184822fd230aa'
        },
        {
            '#': 5,
            time: '2024-03-30 09:11:47',
            event: 'New admin account created',
            source: 'ADMIN_LOG',
            destination: 'Charlie Brown',
            subject: 'Phishing - HR Policy Update',
            hash: 'cd4b29e66e3535a7df759a8af5fbdadabfd3536ee4d45ab2b7d2b0b4756b9a23'
        },
        {
            '#': 6,
            time: '2024-02-10 19:44:36',
            event: 'DNS exfiltration attempt detected',
            source: '172.16.5.10',
            destination: 'Diana Prince',
            subject: 'Phishing - Payment Request',
            hash: '88c6ea5024bfd0dd33ab15ea30f87a6f8e1e8a7e6a1a45db09f61fe3a4c7c01d'
        },
        {
            '#': 7,
            time: '2024-01-25 06:23:02',
            event: 'Suspicious PowerShell execution',
            source: '192.168.1.17',
            destination: 'Emily Clark',
            subject: 'Phishing - Confidental Document',
            hash: '7eafb65143bd72c0d1b8ff9d52b676e9b2de28faedc41b39305f57be95facc8d'
        },
        {
            '#': 8,
            time: '2024-02-17 14:16:43',
            event: 'Possible phishing email received',
            source: '192.168.1.40',
            destination: 'Frank Miller',
            subject: 'Phishing - IT Support Alert',
            hash: 'fed45d93b1cc8a44eccd7d8d5e8ffaad1405d34d7d7dcf570ea1f6b4b376e003'
        },
        {
            '#': 9,
            time: '2024-03-12 05:12:15',
            event: 'Critical vulnerability discovered on server',
            source: '10.2.10.10',
            destination: 'Grace Lee',
            subject: 'Phishing - Password Expiry Notification',
            hash: 'c11ca6c1268b3a37e25e0fe49c89ad781f09c7e15e0e947ba14b13c2a5c2b836'
        },
        {
            '#': 10,
            time: '2024-04-02 11:55:27',
            event: 'Privilege escalation attempt blocked',
            source: '172.16.5.13',
            destination: 'Henry Adams',
            subject: 'Phishing - Security Update',
            hash: '7cb16ad858926cc18ed2abfe6e59b1e2749f999869130250a5e7ccfd56a88053'
        }
    ])

    return { fields, actions, sampleData }
}
