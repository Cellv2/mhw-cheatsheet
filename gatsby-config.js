module.exports = {
    siteMetadata: {
        title: `Monster Hunter: World Cheatsheet`,
        description: `A collection of cheatsheets for Monster Hunter: World`,
        author: `@Cellv2`,
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `gatsby-starter-default`,
                short_name: `starter`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
            },
        },
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
        {
            // Querying to a SQLite database
            resolve: `gatsby-source-sql`,
            options: {
                typeName: "MhwWeaponData",
                // This is the field under which the data will be accessible in a future version
                fieldName: "mhwWeaponData",
                dbEngine: {
                    client: "sqlite3",
                    connection: {
                        filename: "./data/mhw.db",
                    },
                    useNullAsDefault: true,
                },
                // SELECT weapon.id, weapon_type, weapon_text.name AS WeaponName, lang_id
                // FROM weapon
                // INNER JOIN weapon_text ON weapon_text.id = weapon.id
                // WHERE weapon_text.lang_id = "en"
                queryChain: function (x) {
                    return x
                        .select(
                            "weapon.id as WeaponId",
                            "weapon_type as WeaponType",
                            "weapon_text.name as WeaponName",
                            "lang_id as LangId"
                        )
                        .from("weapon")
                        .innerJoin("weapon_text", "weapon_text.id", "weapon.id")
                        .where("weapon_text.lang_id", "=", "en");
                },
            },
        },
    ],
};
