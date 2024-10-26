'use client';

import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Form from './Form';

function FactCard({ fact }) {
  const [editMode, setEditMode] = useState(false);

  return (
    <Card>
      <Card.Body>
        {editMode ? (
          <>
            <p>Edit mode</p>
            <Form obj={fact} />
            <Button onClick={() => setEditMode(false)}>Exit edit modw</Button>
          </>
        ) : (
          <>
            <Button onClick={() => setEditMode(true)}>Edit fact</Button>
            <Button>Delete fact</Button>
            {fact.text}
          </>
        )}
      </Card.Body>
    </Card>
  );
}

FactCard.propTypes = {
  fact: PropTypes.string.isRequired,
};

export default FactCard;
