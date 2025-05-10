import React from 'react';
import { useParams } from 'react-router-dom';
import VisualizerLayout from '../components/visualizations/visualizerlayout';
import Header from '../header/header.jsx';
import Sidebar from '../sidebar/sidebar.jsx';
import './visnext.css';

export const VisNext = () => {
  const { algorithm } = useParams();
  return (
    <div className="vis-next">
      <Header />
      <Sidebar />
      <div className="main-box">
        <h1 className="title">{algorithm ? algorithm.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/\b\w/g, l => l.toUpperCase()) : 'Visualization'}</h1>
        <VisualizerLayout algorithm={algorithm} />
      </div>
    </div>
  );
};