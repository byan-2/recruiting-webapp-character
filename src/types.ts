export type Attribute = {
    Strength: number;
    Dexterity: number;
    Constitution: number;
    Intelligence: number;
    Wisdom: number;
    Charisma: number;
};

export type Class = "Barbarian" | "Wizard" | "Bard";

export type Character = {
    id: number;
    attributes: Attribute;
    skillPoints: Record<string, number>;
    totalAttributePoints: number;
    dc: number;
};