'use client';

// any component that uses useAuth needs this because if a component directly imports useAuth, it needs to be a client component since useAuth uses React hooks.
import { useEffect, useState } from 'react';
import { useAuth } from '@/utils/context/authContext';
import { Button } from 'react-bootstrap';
import { postFact, updateFact } from '../api/facts';

function Home() {
  const [uselessFact, setUselessFact] = useState({});

  const { user } = useAuth();

  const fetchFact = async () => {
    const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en');
    const fact = await response.json();
    setUselessFact(fact);
  };

  const handleSelect = async (bool) => {
    const val = bool ? 'Yes' : 'No';
    const responseObj = {
      userId: user.uid,
      text: uselessFact.text,
    };

    const response = await postFact(responseObj, val);
    await updateFact({ firebaseKey: response.name }, val);

    fetchFact();
  };

  useEffect(() => {
    fetchFact();
  }, []);

  return (
    <>
      <h1>{uselessFact.text}</h1>
      <h4>Did you know this fact?</h4>
      <Button
        className="btn btn-primary"
        onClick={() => {
          handleSelect(true);
        }}
      >
        YES
      </Button>
      <Button
        className="btn btn-secondary"
        onClick={() => {
          handleSelect(false);
        }}
      >
        NO
      </Button>
    </>
  );
}

export default Home;
