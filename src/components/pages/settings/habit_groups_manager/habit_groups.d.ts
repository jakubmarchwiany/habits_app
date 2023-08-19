export type habitGroups = {
    _id: string;
    name: string;
    habits: { _id: string; name: string }[];
};

export type habitGroupsFetch = {
    name: string;
    habits: string[];
};
