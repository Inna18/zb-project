export default {
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
        { name: 'email', title: 'Email', type: 'string' },
        { name: 'password', title: 'Password', type: 'string' },
        { name: 'name', title: 'Name', type: 'string' },
        { name: 'address', title: 'Address', type: 'string' },
        { name: 'phoneNumber', title: 'Phone number', type: 'string' },
        { name: 'profileImg', title: 'Profile image', type: 'image', options: { hotspot: true } },
    ]
}