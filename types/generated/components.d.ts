import type { Schema, Struct } from '@strapi/strapi';

export interface HeadingDescriptionHeadingDescription
  extends Struct.ComponentSchema {
  collectionName: 'components_heading_description_heading_descriptions';
  info: {
    displayName: 'Heading-Description';
  };
  attributes: {
    Description: Schema.Attribute.Blocks;
    Heading: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'heading-description.heading-description': HeadingDescriptionHeadingDescription;
    }
  }
}
