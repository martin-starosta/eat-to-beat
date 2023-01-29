export interface INavItem {
    label: string;
    subLabel?: string;
    children?: Array<INavItem>;
    href?: string;
};

export const NAV_ITEMS: Array<INavItem> = [
    {
        label: 'Plans',
        children: [
            {
                label: 'List',
                subLabel: 'Explore existing meal plans',
                href: '/app/plan',
            },
            {
                label: 'Create',
                subLabel: 'Create new meal plan',
                href: '/app/plan/create',
            },
        ],
    },
    {
        label: 'Recipes',
        children: [
            {
                label: 'Create',
                subLabel: 'Create a new recipe',
                href: '/app/recipes/create',
            },
        ],
    },
];