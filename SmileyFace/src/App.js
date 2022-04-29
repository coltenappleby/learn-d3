
import './App.css';
import React from 'react';
import { Face } from './components/Face';
import {range } from 'd3'

const width = 160;
const height = 160;

const array = range(50)

const App = () => array.map(() => (
    <>
      <Face 
        width = {width}
        height = {height}
        centerX = {width/2}
        centerY = {height/2}
        strokeWidth = {10+ Math.random() * 3}
        eyeOffsetX = {30+ Math.random() * 10}
        eyeOffsetY = {30+ Math.random() * 10}
        eyeRadius = {5 + Math.random() * 10}
        mouthWidth = {10+ Math.random() * 10}
        mouthRadius = {40+ Math.random() * 1}
      />
    </>
)
)


export default App;