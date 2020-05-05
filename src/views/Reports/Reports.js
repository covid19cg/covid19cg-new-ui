import React, { useState } from 'react';
import { Button, CardFooter, Input, Col, Label, FormGroup, Form, CardBody, CardHeader, Card, Row, Alert } from 'reactstrap';

const Reports = () => {

  const getCurrentDate = () => {
    const currentDate = new Date();
    return ('' + currentDate.getFullYear()) + '-' +
      ('' + (currentDate.getMonth() + 1)).padStart(2, '0') + '-' +
      ('' + currentDate.getDate()).padStart(2, '0')
  };

  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(true);

  const onDismiss = () => setVisible(false);

  const onDateChange = (event) => {
    event.target.value && setSelectedDate(event.target.value);
  }

  const showError = (message) => {
    setVisible(true);
    setError(message);
  }

  const getDailyReport = (event) => {
    event.preventDefault();

    setLoading(true);

    fetch(`/reports/${selectedDate}/DailyReport.pdf`, {
      headers: {
        'Content-Type': 'application/pdf'
      },
      responseType: 'blob'
    }).then(response => response.blob())
      .then(blob => {
        setLoading(false);
        if (blob.type === 'application/pdf') {
          window.open(`/reports/${selectedDate}/DailyReport.pdf`);
        } else {
          showError('Report not found for this date!!');
        }
      })
      .catch(() => {
        setLoading(false);
        showError('Report not found for this date!!');
      });
  }

  return <div className="animated fadeIn">
    <Row>
      <Col xs="12">
        {error && <Alert isOpen={visible} toggle={onDismiss} color="danger">{error}</Alert>}
        <Form action="/" method="post" onSubmit={getDailyReport} className="form-horizontal">
          <Card>
            <CardHeader>
              <strong>Daily Report</strong>
            </CardHeader>
            <CardBody>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="date-input">Select Date</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="date" id="date-input" name="date-input" placeholder="date" defaultValue={selectedDate}
                    onChange={onDateChange}
                  />
                </Col>
              </FormGroup>
            </CardBody>
            <CardFooter>
              {loading && <Button disabled type="submit" className="float-right" color="primary"><i className="fa fa-spinner fa-spin"></i>&nbsp; Please wait... </Button>}
              {!loading && <Button type="submit" className="float-right" color="primary"><i className="fa fa-download"></i>&nbsp; Get Report</Button>}
            </CardFooter>
          </Card>
        </Form>
      </Col>
    </Row>
  </div>;
}

export default Reports;
