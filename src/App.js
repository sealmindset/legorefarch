import React, { useState, useEffect } from 'react';
import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { saveAs } from 'file-saver';
import domtoimage from 'dom-to-image';
import { Routes, Route } from 'react-router-dom';
import { blobToBase64 } from './components/utils'; // Import the blobToBase64 utility function

import Swimlane from './components/Swimlane';
import GitHubInteractions from './components/GitHubInteractions';
import Sidebar from './components/Sidebar';

function LegendSwimlane({ legendBlocks }) {
  return (
    <div className="legend-lane">
      <div className="lane">
        <div className="blocks">
          {legendBlocks.map((block) => (
            <div
              key={block.id}
              className="block"
              style={{ backgroundColor: block.color }}
            >
              {block.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  useEffect(() => {
    localStorage.clear();
  }, []);

  function isLocalStorageAvailable() {
    try {
      const test = "test";
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch(e) {
      return false;
    }
  };

  const initialBlocks = [
    { id: 1, color: 'lightgreen', text: 'Authentication & Password Management', swimlane: 'Access Control', tip: 'Tooltip' },
    { id: 2, color: 'lightgreen', text: 'Authorization & User Role Management', swimlane: 'Access Control', tip: 'Tooltip' },
    { id: 3, color: 'lightgreen', text: 'Account Management', swimlane: 'Access Control', tip: 'Tooltip' },
    { id: 4, color: 'lightgreen', text: 'AV and Anti-Malware', swimlane: 'Data Protection', tip: 'Tooltip' },
    { id: 5, color: 'lightgreen', text: 'Cryptography', swimlane: 'Data Protection', tip: 'Tooltip' },
    { id: 6, color: 'lightgreen', text: 'Filesystem Security & Data Access', swimlane: 'Data Protection', tip: 'Tooltip' },
    { id: 7, color: 'lightgreen', text: 'Secure File Transfer', swimlane: 'Data Protection', tip: 'Tooltip' },
    { id: 8, color: 'lightgreen', text: 'Data Backups', swimlane: 'Data Protection', tip: 'Tooltip' },
    { id: 9, color: 'lightgreen', text: 'Certificate & PKI', swimlane: 'Data Protection', tip: 'Tooltip' },
    { id: 10, color: 'lightgreen', text: 'Application Firewall & WAF', swimlane: 'Data Protection', tip: 'Tooltip' },
    { id: 11, color: 'lightgreen', text: 'Secure Data Destruction', swimlane: 'Data Protection', tip: 'Tooltip' },
    { id: 12, color: 'lightgreen', text: 'Anomaly Detection', swimlane: 'Data Protection', tip: 'Tooltip' },
    { id: 13, color: 'lightgreen', text: 'Network Detection & Response', swimlane: 'Data Protection', tip: 'Tooltip' },
    { id: 14, color: 'lightgreen', text: 'SSDLC', swimlane: 'Secure SDLC & Security Processes', tip: 'Tooltip' },
    { id: 15, color: 'lightgreen', text: 'Secure Coding Best Practices', swimlane: 'Secure SDLC & Security Processes', tip: 'Tooltip' },
    { id: 16, color: 'lightgreen', text: 'Pen Testing', swimlane: 'Secure SDLC & Security Processes', tip: 'Tooltip' },
    { id: 17, color: 'lightgreen', text: 'Security Review', swimlane: 'Secure SDLC & Security Processes', tip: 'Tooltip' },
    { id: 18, color: 'lightgreen', text: 'Threat Modeling', swimlane: 'Secure SDLC & Security Processes', tip: 'Tooltip' },
    { id: 19, color: 'lightgreen', text: 'Security Requirements (Policy + Compliance)', swimlane: 'Secure SDLC & Security Processes', tip: 'Tooltip' },
    { id: 20, color: 'lightgreen', text: 'Diaster Recover & Business Continuity', swimlane: 'Secure SDLC & Security Processes', tip: 'Tooltip' },
    { id: 21, color: 'lightgreen', text: 'Non-Prod Env Mgmnt', swimlane: 'Design', tip: 'Tooltip' },
    { id: 22, color: 'lightgreen', text: 'Configuration Management', swimlane: 'Design', tip: 'Tooltip' },
    { id: 23, color: 'lightgreen', text: 'Data Security', swimlane: 'Design', tip: 'Tooltip' },
    { id: 24, color: 'lightgreen', text: 'End-point Security', swimlane: 'Design', tip: 'Tooltip' },
    { id: 25, color: 'lightgreen', text: 'Secure Code', swimlane: 'Design', tip: 'Tooltip' },
    { id: 26, color: 'lightgreen', text: 'Network Security', swimlane: 'Design', tip: 'Tooltip' },
    { id: 27, color: 'lightgreen', text: 'Network/Micro Segmentation', swimlane: 'Design', tip: 'Tooltip' },
    { id: 28, color: 'lightgreen', text: 'High Avai & DDoS Protection', swimlane: 'Design', tip: 'Tooltip' },
    { id: 29, color: 'lightgreen', text: 'Mobile', swimlane: 'Design', tip: 'Tooltip' },
    { id: 30, color: 'lightgreen', text: 'Data Classification', swimlane: 'Design', tip: 'Tooltip' },
    { id: 31, color: 'lightgreen', text: 'Remote Access', swimlane: 'Design', tip: 'Tooltip' },
    { id: 32, color: 'lightgreen', text: 'Standard System Image (CIS Hardening)', swimlane: 'Design', tip: 'Tooltip' },
    { id: 33, color: 'lightgreen', text: 'Services & Capability Management', swimlane: 'Operations Support & Maintenance', tip: 'Tooltip' },
    { id: 34, color: 'lightgreen', text: 'Training & Certification', swimlane: 'Operations Support & Maintenance', tip: 'Tooltip' },
    { id: 35, color: 'lightgreen', text: 'Metrics & Reporting', swimlane: 'Operations Support & Maintenance', tip: 'Tooltip' },
    { id: 36, color: 'lightgreen', text: 'File Integrity Monitoring', swimlane: 'Operations Support & Maintenance', tip: 'Tooltip' },
    { id: 37, color: 'lightgreen', text: 'Whitelisting', swimlane: 'Operations Support & Maintenance', tip: 'Tooltip' },
    { id: 38, color: 'lightgreen', text: 'Outage Management', swimlane: 'Operations Support & Maintenance', tip: 'Tooltip' },
    { id: 39, color: 'lightgreen', text: 'Code & Deployment Automation', swimlane: 'Operations Support & Maintenance', tip: 'Tooltip' },
    { id: 40, color: 'lightgreen', text: 'Log & Monitoring', swimlane: 'Operations Support & Maintenance', tip: 'Tooltip' },
    { id: 41, color: 'lightgreen', text: 'Vulnerability Management', swimlane: 'Operations Support & Maintenance', tip: 'Tooltip' },
    { id: 42, color: 'lightgreen', text: 'Asset Management (Applications & Hardware)', swimlane: 'Operations Support & Maintenance', tip: 'Tooltip' },
    { id: 43, color: 'lightgreen', text: 'Data Retention', swimlane: 'Operations Support & Maintenance', tip: 'Tooltip' },
    { id: 44, color: 'lightgreen', text: 'Compliance & Audit Support', swimlane: 'Operations Support & Maintenance', tip: 'Tooltip' },
    { id: 45, color: 'lightgreen', text: 'Automation', swimlane: 'Operations Support & Maintenance', tip: 'Tooltip' },
    { id: 46, color: 'lightgreen', text: 'Defect Management', swimlane: 'Operations Support & Maintenance', tip: 'Tooltip' },
    { id: 47, color: 'lightgreen', text: 'Capacity & Scalability Management', swimlane: 'Operations Support & Maintenance', tip: 'Tooltip' },
    { id: 48, color: 'lightgreen', text: 'Patch, Software & Firmware Management', swimlane: 'Operations Support & Maintenance', tip: 'Tooltip' },
    { id: 49, color: 'lightgreen', text: 'Intake & Offboarding Management', swimlane: 'Operations Support & Maintenance', tip: 'Tooltip' },
    { id: 50, color: 'lightgreen', text: 'Configuration & Policy Management', swimlane: 'Operations Support & Maintenance', tip: 'Tooltip' },
  ].map((block) => ({ ...block, color: 'lightgreen' })); // Set default color

  const initialLegendBlocks = [
    { id: 1, color: 'lightgrey', text: 'TBD/Unknown', swimlane: 'Legend', tip: 'Tooltip' },
    { id: 2, color: 'lightgreen', text: 'Compliant', swimlane: 'Legend', tip: 'Tooltip' },
    { id: 3, color: 'lightyellow', text: 'Partially Compliant', swimlane: 'Legend', tip: 'Tooltip' },
    { id: 4, color: '#FFCCCB', text: 'Not Compliant', swimlane: 'Legend', tip: 'Tooltip' },
    { id: 5, color: 'lightblue', text: 'Not Applicable', swimlane: 'Legend', tip: 'Tooltip' },
  ];
  
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [blocks, setBlocks] = useState(initialBlocks);

  const initialUnsavedDiagram = initialBlocks.map((block) => ({
    ...block,
    color: block.color || 'lightgreen', // Use the loaded color or default to lightgreen
  }));
  const [unsavedDiagram, setUnsavedDiagram] = useState(initialUnsavedDiagram); // Store the unsaved diagram data

  useEffect(() => {
    if (isLocalStorageAvailable()) {
      const storedBlocks = localStorage.getItem('blocks');
      if (storedBlocks) {
        setBlocks(JSON.parse(storedBlocks));
      }
    } else {
      console.warn("Local storage is not available.");
    }
  }, []);

  useEffect(() => {
    if (isLocalStorageAvailable()) {
      try {
        localStorage.setItem('blocks', JSON.stringify(blocks));
      } catch (error) {
        console.error("Failed to save blocks to local storage:", error);
      }
    }
  }, [blocks]);

  const updateBlock = (updatedBlock) => {
    setBlocks(prevBlocks => prevBlocks.map(block =>
      block.id === updatedBlock.id ? updatedBlock : block
    ));
  };

  const deleteBlock = (id) => {
    const newBlocks = blocks.filter((block) => block.id !== id);
    setBlocks(newBlocks);
  };
  
  // Function to handle color change
  const handleColorChange = (blockId, newColor) => {
    const updatedBlock = blocks.find(block => block.id === blockId);
    if (updatedBlock) {
      updatedBlock.color = newColor;
      updateBlock(updatedBlock);
    }
  };

   // Function to save blocks to JSON
   const saveBlocksToJson = () => {
    const json = JSON.stringify(blocks);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'blocks.json';
    a.click();
  };

  const handleSaveDiagram = () => {
    const userFilename = window.prompt("Enter filename to save", "diagram.json");
    if (userFilename) {
      const dataToSave = JSON.stringify(blocks, null, 2);
      const blob = new Blob([dataToSave], { type: 'application/json' });
      saveAs(blob, userFilename);
    }
  };

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const [history, setHistory] = useState([initialBlocks]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const addToHistory = (newBlocks) => {
    const newHistory = history.slice(0, historyIndex + 1);
    setHistory([...newHistory, newBlocks]);
    setHistoryIndex(historyIndex + 1);
  };

  const handleAddBlock = (newBlock) => {
    const blockWithColor = { ...newBlock, color: newBlock.color || 'lightgreen' };
    const newBlocks = [...blocks, blockWithColor];
    setBlocks(newBlocks);
    setUnsavedDiagram(newBlocks); // Update the unsavedDiagram state
    addToHistory(newBlocks);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1; // Calculate the new index first
      setHistoryIndex(newIndex); // Update the history index
      setBlocks(history[newIndex]); // Use the new index to access the history state
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1; // Calculate the new index first
      setHistoryIndex(newIndex); // Update the history index
      setBlocks(history[newIndex]); // Use the new index to access the history state
    }
  };

  const handleDeleteBlock = (blockId) => {
    const newBlocks = blocks.filter((block) => block.id !== blockId);
    setBlocks(newBlocks);
    setUnsavedDiagram(newBlocks); // Update the unsavedDiagram state
    addToHistory(newBlocks);
  };

  const handleMoveBlock = (blockId, targetSwimlane) => {
    const updatedBlocks = blocks.map(block => {
      if (block.id === blockId) {
        return { ...block, swimlane: targetSwimlane };
      }
      return block;
    });
    const newBlocks = updatedBlocks;  // Define newBlocks here
    setBlocks(updatedBlocks);
    addToHistory(newBlocks);  // Use newBlocks
  };

  const token = '95ad969bda5915a66d06fd842e73b5dc5c276b55';

  const handleGenerateAndUploadImage = async () => {
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

      // Upload the generated PNG image to GitHub
      if (token) {
        try {
          const formData = new FormData();
          formData.append('file', blob, userFilename);
  
          // Convert the Blob to base64 using the utility function
          const fileContent = await blobToBase64(blob);
  
          const response = await fetch('https://api.github.com/repos/sealmindset/SecureIoT/contents' + userFilename, {
            method: 'PUT',
            headers: {
              Authorization: `token ${token}`,
              'Content-Type': 'application/vnd.github.v3+json',
            },
            body: JSON.stringify({
              message: 'Upload user-generated PNG file',
              content: fileContent,
            }),
          });
  
          if (response.ok) {
            console.log('File uploaded to GitHub successfully');
          } else {
            console.error('Error uploading file to GitHub:', response.statusText);
          }
        } catch (error) {
          console.error('Error uploading file to GitHub:', error);
        }
      }
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

  const handleReset = () => {
    localStorage.removeItem('savedDiagram'); // Clear localStorage
    localStorage.clear();
    window.location.reload();
  };


  // Save the unsaved diagram to local storage when the blocks state changes
  useEffect(() => {
    localStorage.setItem('unsavedDiagram', JSON.stringify(unsavedDiagram));
  }, [unsavedDiagram]);

  const handleLoadDiagram = async (event) => {
    if (!event.target.files || !event.target.files[0]) {
      alert('No file selected.');
      return;
    }

    const file = event.target.files[0];

    try {
      const fileContent = await file.text();
      const loadedDiagram = JSON.parse(fileContent);
      if (loadedDiagram && Array.isArray(loadedDiagram)) {
        setBlocks(loadedDiagram.map(block => ({
          ...block,
          color: block.color || 'lightgreen', // Default to lightgreen if no color is specified
          url: block.url || '' // Set the URL if available
        })));
      } else {
        alert('Invalid JSON format.');
      }
    } catch (error) {
      console.error('Error loading diagram:', error);
      alert('Error loading diagram. Please check the console for details.');
    }
  };

  return (
    <React.Fragment>
      <div className="App">
        <DndProvider backend={HTML5Backend}>
          <Sidebar
            expanded={sidebarExpanded}
            onToggle={toggleSidebar}
            onAddBlock={handleAddBlock}
            onGenerateImage={handleGenerateAndUploadImage}
            onReset={handleReset}
            onUndo={handleUndo}
            onRedo={handleRedo}
            onSaveDiagram={handleSaveDiagram} 
            saveBlocksToJson={saveBlocksToJson}
            onLoadDiagram={handleLoadDiagram} 
          />
          <main className={`content ${sidebarExpanded ? 'content-expanded' : ''}`}>
            <div className="top-section">
              {/* Top section content */}
              <h1 className="app-title">
                RefArch Diagram Generator
              </h1>
            </div>
            <div className="middle-section">
                {/* Middle section content */}
              <Routes>
                {/* Use the element prop to render components */}
                <Route path="/" element={<Swimlane
                    blocks={blocks}
                    onMoveBlock={handleMoveBlock}
                    onGenerateImage={handleGenerateAndUploadImage}
                    onReset={handleReset}
                    onDeleteBlock={handleDeleteBlock}
                    onUndo={handleUndo} // Pass the undo function
                    onRedo={handleRedo} // Pass the redo function
                    onColorChange={handleColorChange} // Pass the color change function
                    setBlocks={setBlocks}
                  />} />
                <Route path="/github" element={<GitHubInteractions />} />
              </Routes>
              <div className="center-container">
                <div className={`grid-container ${sidebarExpanded ? 'sidebar-expanded' : ''}`}>
                  <Swimlane
                    blocks={blocks}
                    updateBlock={updateBlock} 
                    deleteBlock={deleteBlock}
                    onMoveBlock={handleMoveBlock}
                    onGenerateImage={handleGenerateAndUploadImage}
                    onReset={handleReset}
                    onDeleteBlock={handleDeleteBlock}
                    onUndo={handleUndo} // Pass the undo function
                    onRedo={handleRedo} // Pass the redo function
                    onColorChange={handleColorChange}
                    setBlocks={setBlocks}
                  />
                  <LegendSwimlane legendBlocks={initialLegendBlocks} />
                </div>
              </div>
            </div>
            <div className="bottom-section">
              {/* Bottom section content */}
              <h1 className="app-title">
                RefArch Diagram Generator
              </h1>
            </div>
          </main>
        </DndProvider>
      </div>          
    </React.Fragment>
  );
}

export default App;