// frontend/src/components/features/menu/HandrollSubTypeNav.jsx
import React from 'react';
import styles from './HandrollSubTypeNav.module.css';

// Updated to match EXACT subCategory values from mock data
const subTypes = [
  { id: null, name: 'Todos' }, // null represents showing all handrolls
  { id: 'Príncipe (16cm)', name: 'Príncipe (16cm)' }, // Exact match to mock data
  { id: 'Rey (22cm)', name: 'Rey (22cm)' }, // Exact match to mock data
];

const HandrollSubTypeNav = ({ selectedSubType, onSelectSubType }) => {
  return (
    <nav className={styles.subTypeNav}>
      {subTypes.map((type) => (
        <button
          key={type.id || 'all'} // Use 'all' as key for the null id
          className={`${styles.subTypeButton} ${selectedSubType === type.id ? styles.active : ''}`}
          onClick={() => onSelectSubType(type.id)}
          aria-pressed={selectedSubType === type.id} // Accessibility
        >
          {type.name}
        </button>
      ))}
    </nav>
  );
};

export default HandrollSubTypeNav;