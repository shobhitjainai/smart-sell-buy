export const getUserData = (user) => ({
    uuid: `uuid_${user?.first_name}_${user?.email}`,
    from: "custom-db",
    role: [`${user?.role}`],
    data: {
            displayName: `${user?.first_name}`,
        photoURL: "assets/images/logo/icmlogo.png",
            email: user?.email,
        settings: {
            layout: {},
            theme: {}
        },
        shortcuts: [],
        userData: user,

    },
})