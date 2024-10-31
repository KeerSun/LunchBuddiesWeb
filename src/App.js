import React from 'react';
import { Container, Form, Button, Card, Row, Col, Badge } from 'react-bootstrap';
import { 
  PersonPlusFill, 
  PeopleFill, 
  Shuffle, 
  XCircleFill,
  PersonBadge,
  ArrowCounterclockwise
} from 'react-bootstrap-icons';
import shuffleArray from './utils/shuffleArray';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function makeGroups(peeps, groupSize) {
  if (!peeps.length || groupSize < 1) return [];
  
  const shuffledPeeps = shuffleArray([...peeps]);
  const numberOfGroups = Math.ceil(shuffledPeeps.length / groupSize);
  const groups = Array.from({ length: numberOfGroups }, () => []);
  
  shuffledPeeps.forEach((person, index) => {
    const groupIndex = index % numberOfGroups;
    groups[groupIndex].push(person);
  });
  
  return groups;
}

export default function App() {
  const [peeps, setPeeps] = React.useState([]);
  const [grouping, setGrouping] = React.useState([]);
  const [groupSize, setGroupSize] = React.useState(2);
  const [inputValue, setInputValue] = React.useState('');

  const colors = [
    'primary', 'success', 'danger', 'warning', 'info',
    'secondary', 'dark'
  ];

  const handleAddPerson = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      setPeeps((prev) => [...prev, e.target.value.trim()]);
      setInputValue("");
    }
  };

  const handleReset = () => {
    setPeeps([]);
    setGrouping([]);
    setGroupSize(2);
    setInputValue('');
  };

  const handleCreateGroups = () => {
    setGrouping(makeGroups(peeps, groupSize));
  };

  const displayPeeps = () => (
    <div className="people-list">
      {peeps.map((name, index) => (
        <Card key={index} className="person-card border-0 shadow-sm">
          <Card.Body className="d-flex align-items-center justify-content-between p-3">
            <div className="d-flex align-items-center overflow-hidden">
              <div 
                className="avatar me-2"
                style={{ backgroundColor: `var(--bs-${colors[index%colors.length]})` }}
              >
                {name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="name-badge">
                <span className="name-text fw-bold">{name}</span>
              </div>
            </div>
            <Button 
              variant="link" 
              className="text-danger p-0 delete-btn"
              onClick={() => setPeeps(prev => prev.filter((_, i) => i !== index))}
            >
              <XCircleFill size={16} />
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );

  const displayGroups = () => (
    <Row className="g-4">
      {grouping.map((group, groupIndex) => (
        <Col key={groupIndex} xs={12} md={6} lg={4}>
          <Card className="group-card h-100 shadow">
            <Card.Header className="gradient-bg text-white">
              <h5 className="mb-0">Group {groupIndex + 1}</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex flex-column gap-3">
                {group.map((person, personIndex) => (
                  <div key={personIndex} className="d-flex align-items-center">
                    <div 
                      className="avatar me-3 d-flex align-items-center justify-content-center"
                      style={{ backgroundColor: `var(--bs-${colors[personIndex%colors.length]})` }}
                    >
                      {person.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span>{person}</span>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );

  return (
    <Container fluid className="py-5 px-4">
      <Card className="shadow-lg mb-5 text-center">
        <Card.Header className="gradient-bg text-white py-4">
          <h1 className="display-4 mb-0 d-flex align-items-center justify-content-center">
            Lunch Buddies
          </h1>
        </Card.Header>
      </Card>

      <Row className="g-4 mb-5">
        <Col md={5}>
          <Card className="shadow-lg h-100">
            <Card.Header className="gradient-bg text-white">
              <h3 className="mb-0 d-flex align-items-center">
                <PersonPlusFill className="header-icon" />
                Create Groups
              </h3>
            </Card.Header>
            <Card.Body>
              <Form>
                <div>
                  <Form.Group className="mb-4">
                    <Form.Label className="d-flex align-items-center">
                      <PersonBadge className="form-icon" />
                      Add People
                    </Form.Label>
                    <div className="d-flex gap-2">
                      <Form.Control
                        type="text"
                        value={inputValue}
                        onChange={(e)=>setInputValue(e.target.value)}
                        placeholder="Enter name and press Enter"
                        onKeyUp={handleAddPerson}
                        className="input-group-hover"
                      />
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-0">
                    <Form.Label className="d-flex align-items-center">
                      <PeopleFill className="form-icon" />
                      Group Size
                    </Form.Label>
                    <div className="d-flex gap-2">
                      <Form.Control
                        type="number"
                        value={groupSize}
                        onChange={(e) => setGroupSize(parseInt(e.target.value))}
                        min="2"
                        className="input-group-hover"
                      />
                    </div>
                  </Form.Group>
                </div>
              </Form>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-between">
              <Button 
                variant="outline-danger"
                onClick={handleReset}
                className="d-flex align-items-center"
              >
                <ArrowCounterclockwise className="form-icon" />
                Reset All
              </Button>
              <Button 
                variant="primary"
                onClick={handleCreateGroups}
                className="d-flex align-items-center"
              >
                <Shuffle className="form-icon" />
                Create Groups
              </Button>
            </Card.Footer>
          </Card>
        </Col>
        <Col>
        {peeps.length > 0 && 
         <Card className="shadow-lg">
          <Card.Header className="gradient-bg text-white d-flex justify-content-between align-items-center">
            <h3 className="mb-0 d-flex align-items-center">
              <PersonBadge className="header-icon" />
              People List
            </h3>
            <Badge bg="light" text="dark" pill>
              {peeps.length} people
            </Badge>
          </Card.Header>
          <Card.Body className="overflow-auto" style={{ maxHeight: '400px' }}>
            {displayPeeps()}
          </Card.Body>
        </Card>
        }  
        </Col>
      </Row>

      {grouping.length > 0 && (
        <Card className="shadow-lg">
          <Card.Header className="gradient-bg text-white d-flex justify-content-between align-items-center">
            <h3 className="mb-0 d-flex align-items-center">
              <PeopleFill className="header-icon" />
              Generated Groups
            </h3>
            <Badge bg="light" text="dark" pill>
              {grouping.length} groups
            </Badge>
          </Card.Header>
          <Card.Body>
            {displayGroups()}
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}