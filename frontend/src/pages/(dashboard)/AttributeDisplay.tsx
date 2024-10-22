import React from 'react';
// import {Color,Attribute,AttributeDisplayProps} from '../src/types/attribute.ts'
interface Color {
    name: string;
    image: string;
  }
  
  interface Attribute {
    name: string;
    sizes: string[];
    colors: Color[];
  }
  
  interface AttributeDisplayProps {
    attribute: Attribute;
  }

const AttributeDisplay: React.FC<AttributeDisplayProps> = ({ attribute }) => {
    return (
      <div>
        <strong>Name:</strong> {attribute.name} <br />
        <strong>Sizes:</strong> {attribute.sizes.join(', ')} <br />
        <strong>Colors:</strong>{' '}
        {attribute.colors.map((color: Color) => (
          <span key={color.name}>
            {color.name}{' '}
            <img src={color.image} alt={color.name} style={{ width: 20, height: 20 }} />
          </span>
        ))}
      </div>
    );
  };
  
  export default AttributeDisplay;
