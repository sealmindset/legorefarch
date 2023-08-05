import React, { useState } from 'react';
import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Swimlane from './components/Swimlane';
import { saveAs } from 'file-saver';
import domtoimage from 'dom-to-image';
import Sidebar from './components/Sidebar';

function App() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const initialBlocks = [
    { id: 1, color: 'lightgreen', text: 'Authentication & Password Management', swimlane: 'Access Control' },
    { id: 2, color: 'lightgreen', text: 'Authorization & User Role Management', swimlane: 'Access Control' },
    { id: 3, color: 'lightgreen', text: 'Account Management', swimlane: 'Access Control' },
    { id: 4, color: 'lightgreen', text: 'AV and Anti-Malware', swimlane: 'Data Protection' },
    { id: 5, color: 'lightgreen', text: 'Cryptography', swimlane: 'Data Protection' },
    { id: 6, color: 'lightgreen', text: 'Filesystem Security & Data Access', swimlane: 'Data Protection' },
    { id: 7, color: 'lightgreen', text: 'Secure File Transfer', swimlane: 'Data Protection' },
    { id: 8, color: 'lightgreen', text: 'Data Backups', swimlane: 'Data Protection' },
    { id: 9, color: 'lightgreen', text: 'Certificate & PKI', swimlane: 'Data Protection' },
    { id: 10, color: 'lightgreen', text: 'Application Firewall & WAF', swimlane: 'Data Protection' },
    { id: 11, color: 'lightblue', text: 'Secure Data Destruction', swimlane: 'Data Protection' },
    { id: 12, color: 'lightgreen', text: 'Anomaly Detection', swimlane: 'Data Protection' },
    { id: 13, color: 'lightgreen', text: 'Network Detection & Response', swimlane: 'Data Protection' },
    { id: 14, color: 'lightgreen', text: 'SSDLC', swimlane: 'Secure SDLC & Security Processes' },
    { id: 15, color: 'lightgreen', text: 'Secure Coding Best Practices', swimlane: 'Secure SDLC & Security Processes' },
    { id: 16, color: 'lightgreen', text: 'Pen Testing', swimlane: 'Secure SDLC & Security Processes' },
    { id: 17, color: 'lightgreen', text: 'Security Review', swimlane: 'Secure SDLC & Security Processes' },
    { id: 18, color: 'lightgreen', text: 'Threat Modeling', swimlane: 'Secure SDLC & Security Processes' },
    { id: 19, color: 'lightgreen', text: 'Security Requirements (Policy + Compliance)', swimlane: 'Secure SDLC & Security Processes' },
    { id: 20, color: 'lightgreen', text: 'Diaster Recover & Business Continuity', swimlane: 'Secure SDLC & Security Processes' },
    { id: 21, color: 'lightgreen', text: 'Non-Prod Env Mgmnt', swimlane: 'Design' },
    { id: 22, color: 'lightgreen', text: 'Configuration Management', swimlane: 'Design' },
    { id: 23, color: 'lightblue', text: 'Data Security', swimlane: 'Design' },
    { id: 24, color: 'lightgreen', text: 'End-point Security', swimlane: 'Design' },
    { id: 25, color: 'lightgreen', text: 'Secure Code', swimlane: 'Design' },
    { id: 26, color: 'lightgreen', text: 'Network Security', swimlane: 'Design' },
    { id: 27, color: 'lightgreen', text: 'Network/Micro Segmentation', swimlane: 'Design' },
    { id: 28, color: 'lightgreen', text: 'High Avai & DDoS Protection', swimlane: 'Design' },
    { id: 29, color: 'lightblue', text: 'Mobile', swimlane: 'Design' },
    { id: 30, color: 'lightgreen', text: 'Data Classification', swimlane: 'Design' },
    { id: 31, color: 'lightgreen', text: 'Remote Access', swimlane: 'Design' },
    { id: 32, color: 'lightgreen', text: 'Standard System Image (CIS Hardening)', swimlane: 'Design' },
    { id: 33, color: 'lightgreen', text: 'Services & Capability Management', swimlane: 'Operations Support & Maintenance' },
    { id: 34, color: 'lightgreen', text: 'Training & Certification', swimlane: 'Operations Support & Maintenance' },
    { id: 35, color: 'lightgreen', text: 'Metrics & Reporting', swimlane: 'Operations Support & Maintenance' },
    { id: 36, color: 'lightgreen', text: 'File Integrity Monitoring', swimlane: 'Operations Support & Maintenance' },
    { id: 37, color: 'lightgreen', text: 'Whitelisting', swimlane: 'Operations Support & Maintenance' },
    { id: 38, color: 'lightgreen', text: 'Outage Management', swimlane: 'Operations Support & Maintenance' },
    { id: 39, color: 'lightgreen', text: 'Code & Deployment Automation', swimlane: 'Operations Support & Maintenance' },
    { id: 40, color: 'lightgreen', text: 'Log & Monitoring', swimlane: 'Operations Support & Maintenance' },
    { id: 41, color: 'lightgreen', text: 'Vulnerability Management', swimlane: 'Operations Support & Maintenance' },
    { id: 42, color: 'lightgreen', text: 'Asset Management (Applications & Hardware)', swimlane: 'Operations Support & Maintenance' },
    { id: 43, color: 'lightgreen', text: 'Data Retention', swimlane: 'Operations Support & Maintenance' },
    { id: 44, color: 'lightgreen', text: 'Compliance & Audit Support', swimlane: 'Operations Support & Maintenance' },
    { id: 45, color: 'lightgreen', text: 'Automation', swimlane: 'Operations Support & Maintenance' },
    { id: 46, color: 'lightgreen', text: 'Defect Management', swimlane: 'Operations Support & Maintenance' },
    { id: 47, color: 'lightgreen', text: 'Capacity & Scalability Management', swimlane: 'Operations Support & Maintenance' },
    { id: 48, color: 'lightgreen', text: 'Patch, Software & Firmware Management', swimlane: 'Operations Support & Maintenance' },
    { id: 49, color: 'lightgreen', text: 'Intake & Offboarding Management', swimlane: 'Operations Support & Maintenance' },
    { id: 50, color: 'lightgreen', text: 'Configuration & Policy Management', swimlane: 'Operations Support & Maintenance' },
  ];

  const [blockColors, setBlockColors] = useState(() => {
    // Initialize block colors using initialBlocks
    const initialBlockColors = initialBlocks.reduce((acc, block) => {
      acc[block.id] = block.color;
      return acc;
    }, {});
    return initialBlockColors;
  });

  const handleReset = () => {
    const resetBlocks = initialBlocks.map((block) => ({
      ...block,
      color: blockColors[block.id] || block.color, // Use blockColors to reset the color
    }));
    setBlocks(resetBlocks);
  
    // Reset block colors for all blocks using initial colors
    const resetBlockColors = initialBlocks.reduce((acc, block) => {
      acc[block.id] = block.color;
      return acc;
    }, {});
    setBlockColors(resetBlockColors); // Reset blockColors to match initial colors
  };
  
  const [blocks, setBlocks] = useState(initialBlocks);

  const handleMoveBlock = (blockId, targetSwimlane) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === blockId ? { ...block, swimlane: targetSwimlane } : block
      )
    );
  };

  const handleGenerateImage = async () => {
    const suggestedFilename = 'Lego_RefArch.png'; // Default filename
    const userFilename = window.prompt('Enter a filename for the PNG image:', suggestedFilename);
  
    if (!userFilename) {
      console.log('Image generation canceled.');
      return;
    }
  
    console.log('Generating Image...');
  
    const gridContainer = document.querySelector('.grid-container'); // Replace with the actual CSS grid container class
  
    if (!gridContainer) {
      return;
    }
  
    try {
      // Convert the grid container to a PNG image using dom-to-image
      const image = await domtoimage.toPng(gridContainer);
  
      // Create a Blob from the image data URL
      const blob = dataURLtoBlob(image);
  
      // Use the saveAs function to download the PNG image with the user-provided filename
      saveAs(blob, userFilename);
  
      console.log('Generating Image Complete.');
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  // Helper function to convert data URL to Blob
  function dataURLtoBlob(dataUrl) {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  return (
    <div className="App">
      <Sidebar
        expanded={sidebarExpanded}
        onToggle={toggleSidebar}
        onGenerateImage={handleGenerateImage}
        onReset={handleReset}
      />
      <main className={`content ${sidebarExpanded ? 'content-expanded' : ''}`}>
        <div className="center-container">
          <h1>RefArch Diagram Generator</h1>
          <DndProvider backend={HTML5Backend}>
            <div className={`grid-container ${sidebarExpanded ? 'sidebar-expanded' : ''}`}>
            <Swimlane
              blocks={blocks}
              onMoveBlock={handleMoveBlock}
              onGenerateImage={handleGenerateImage}
              onReset={handleReset}
            />
            </div>
          </DndProvider>
        </div>
      </main>
    </div>
  );
}

export default App;