import React, { createContext, useContext, useState, useEffect } from 'react';

const FarmConnectContext = createContext();

export const useFarmConnect = () => useContext(FarmConnectContext);

export const FarmConnectProvider = ({ children }) => {
  // Mock 'Me' 
  const [currentUser] = useState({
    id: "me_1",
    name: "Ramesh K.",
    village: "Tumkur",
    crops: "Tomatoes, Onions",
    land: "5 Acres",
    experience: 10,
    rating: 4.8,
    phone: "+91 9876543210"
  });

  // Dummy Network Database
  const [farmers, setFarmers] = useState([
    { id: "f_1", name: "Suresh R.", village: "Tumkur", crops: "Tomatoes", land: "3 Acres", experience: 8, rating: 4.5, phone: "+91 9123456789" },
    { id: "f_2", name: "Anil P.", village: "Tumkur", crops: "Onions, Tomatoes", land: "4 Acres", experience: 5, rating: 4.2, phone: "+91 9988776655" },
    { id: "f_3", name: "Guruswamy", village: "Mysore", crops: "Wheat", land: "10 Acres", experience: 15, rating: 4.9, phone: "+91 9999999999" }, // different village
    { id: "f_4", name: "Venkatesh S.", village: "Tumkur", crops: "Cabbage, Tomatoes", land: "2 Acres", experience: 3, rating: 4.0, phone: "+91 8888888888" },
  ]);

  // Connections ( { senderId, receiverId, status: 'pending'|'accepted' } )
  const [connections, setConnections] = useState([]);
  
  // Pools ( { id, name, village, cropType, creatorId } )
  const [pools, setPools] = useState([]);

  // Pool Members ( { poolId, farmerId, contribution: { A, B, C } } )
  const [poolMembers, setPoolMembers] = useState([]);

  // Messages ( { id, poolId, senderId, text, timestamp } )
  const [messages, setMessages] = useState([]);


  // ======== API ACTIONS ========

  const getFarmersByVillage = (village) => {
    return farmers.filter(f => f.village === village && f.id !== currentUser.id);
  };

  const getConnectionStatus = (targetId) => {
    const conn = connections.find(c => 
      (c.senderId === currentUser.id && c.receiverId === targetId) ||
      (c.receiverId === currentUser.id && c.senderId === targetId)
    );
    return conn ? conn.status : 'none';
  };

  const sendConnectRequest = (targetId) => {
    setConnections(prev => [...prev, { senderId: currentUser.id, receiverId: targetId, status: 'pending' }]);
  };

  const getIncomingRequests = () => {
    return connections.filter(c => c.receiverId === currentUser.id && c.status === 'pending');
  };

  const respondRequest = (senderId, accept) => {
    setConnections(prev => prev.map(c => {
      if (c.senderId === senderId && c.receiverId === currentUser.id && c.status === 'pending') {
        return { ...c, status: accept ? 'accepted' : 'rejected' };
      }
      return c;
    }).filter(c => c.status !== 'rejected'));
  };

  // Helper to instantly generate random contributions for a dummy crop logic
  const genMockContribution = () => ({
    A: Math.floor(Math.random() * 50) + 10,
    B: Math.floor(Math.random() * 80) + 20,
    C: Math.floor(Math.random() * 30) + 5
  });

  const getMyActivePoolId = () => {
    const mem = poolMembers.find(pm => pm.farmerId === currentUser.id);
    return mem ? mem.poolId : null;
  };

  const inviteToPool = (targetId) => {
    let myPoolId = getMyActivePoolId();
    
    // If we have no pool, create one instantly (Simulating cluster creation)
    if (!myPoolId) {
      const newPool = {
        id: `pool_${Date.now()}`,
        name: `Tomato Cluster - ${currentUser.village}`,
        village: currentUser.village,
        cropType: "Mixed",
        creatorId: currentUser.id
      };
      setPools(prev => [...prev, newPool]);
      myPoolId = newPool.id;
      
      // Auto-add myself
      setPoolMembers(prev => [...prev, {
        poolId: myPoolId,
        farmerId: currentUser.id,
        contribution: genMockContribution()
      }]);
    }

    // Automatically add the invited user for MVP demonstration (mocking invite acceptance)
    // Normally we'd send an invite and wait for acceptance.
    const isTargetInPool = poolMembers.find(pm => pm.poolId === myPoolId && pm.farmerId === targetId);
    if(!isTargetInPool) {
        setPoolMembers(prev => [...prev, {
            poolId: myPoolId,
            farmerId: targetId,
            contribution: genMockContribution()
        }]);
    }
    
    return myPoolId;
  };

  const getPoolInfo = (poolId) => {
    return pools.find(p => p.id === poolId);
  };

  const getPoolMembersInfo = (poolId) => {
    const mems = poolMembers.filter(pm => pm.poolId === poolId);
    return mems.map(m => {
      // Find full farmer details
      const isMe = m.farmerId === currentUser.id;
      const farmerDetail = isMe ? currentUser : farmers.find(f => f.id === m.farmerId);
      return { ...m, ...farmerDetail };
    });
  };

  const getPoolTotalGrades = (poolId) => {
    const mems = poolMembers.filter(pm => pm.poolId === poolId);
    let A = 0, B = 0, C = 0;
    mems.forEach(m => {
      A += m.contribution.A;
      B += m.contribution.B;
      C += m.contribution.C;
    });
    return { A, B, C, total: A + B + C };
  };

  const getMessages = (poolId) => {
    return messages.filter(m => m.poolId === poolId).sort((a,b) => a.timestamp - b.timestamp);
  };

  const sendMessage = (poolId, text) => {
    const newMsg = {
      id: `msg_${Date.now()}`,
      poolId,
      senderId: currentUser.id,
      text,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, newMsg]);
  };

  // Mock incoming message for testing
  useEffect(() => {
    const myPool = getMyActivePoolId();
    if(myPool && messages.length > 0) {
      // very simple mocked reply logic just to show chat is alive
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.senderId === currentUser.id) {
         setTimeout(() => {
            const others = getPoolMembersInfo(myPool).filter(m => m.farmerId !== currentUser.id);
            if(others.length > 0) {
              const randomOther = others[Math.floor(Math.random() * others.length)];
              setMessages(prev => [...prev, {
                id: `msg_${Date.now()}`,
                poolId: myPool,
                senderId: randomOther.farmerId,
                text: ["Agreed, let's ship it by evening.", "I can contribute more tomorrow.", "Great point!"][Math.floor(Math.random()*3)],
                timestamp: Date.now()
              }]);
            }
         }, 3000);
      }
    }
  }, [messages.length]);


  const value = {
    currentUser,
    farmers,
    getFarmersByVillage,
    getConnectionStatus,
    sendConnectRequest,
    getIncomingRequests,
    respondRequest,
    getMyActivePoolId,
    inviteToPool,
    getPoolInfo,
    getPoolMembersInfo,
    getPoolTotalGrades,
    getMessages,
    sendMessage
  };

  return (
    <FarmConnectContext.Provider value={value}>
      {children}
    </FarmConnectContext.Provider>
  );
};
