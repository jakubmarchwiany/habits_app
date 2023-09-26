export type habitGroups = {
    _id: string;
    habits: { _id: string; name: string }[];
    name: string;
};

export type habitGroupsFetch = {
    habits: string[];
    name: string;
};
