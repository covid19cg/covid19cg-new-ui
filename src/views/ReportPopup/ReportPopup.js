import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useEffectOnce, useLocalStorage } from 'react-use';

const ReportPopup = () => {

  const getCurrentDate = () => {
    const currentDate = new Date();

    return ('' + currentDate.getFullYear()) + '-' +
      ('' + (currentDate.getMonth() + 1)).padStart(2, '0') + '-' +
      ('' + currentDate.getDate()).padStart(2, '0')
  };

  const [showPopup, setShowPopup] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');

  const currentDate = getCurrentDate();
  const localStorageKey = 'popupShown_' + currentDate;
  const [popupShown, setPopupShown] = useLocalStorage(localStorageKey, false);

  const fetchReport = () => {

    const currentDate = getCurrentDate();

    fetch(`/reports/${currentDate}/DailyReport.pdf`, {
      headers: {
        'Content-Type': 'application/pdf'
      },
      responseType: 'blob'
    }).then(response => response.blob())
      .then(blob => {
        if (blob.type === 'application/pdf') {
          setPdfUrl(`/reports/${currentDate}/DailyReport.pdf`);
          setShowPopup(true);
          setPopupShown(true);
        } else {
          setShowPopup(false);
        }
      })
      .catch(() => {
        setShowPopup(false);
      });
  }

  useEffectOnce(() => {
    if (!popupShown) {
      fetchReport();
    }
  });

  const toggle = () => setShowPopup(!showPopup);

  return <div className="animated fadeIn">
    {showPopup &&
      <Modal className={'modal-lg'} isOpen={showPopup} toggle={toggle} backdrop={true} keyboard={true}>
        <ModalHeader toggle={toggle}>Today's Report</ModalHeader>
        <ModalBody style={{ height: '600px' }}>
          <iframe src={pdfUrl + '#zoom=50'} width='100%' height='100%' title={'Daily Report'} ></iframe>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Close</Button>
        </ModalFooter>
      </Modal>}
  </div>;

}

export default ReportPopup;
