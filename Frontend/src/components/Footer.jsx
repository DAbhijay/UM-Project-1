import React from "react";

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div className = "container" style={styles.footerContent}>
                <div styles={styles.column}>
                    <h3 style={styles.heading}> Urban company clone </h3>
                    <p style={styles.text}> Professional Home services are provided! </p>
                </div>

                <div styles={styles.column}>
                    <h4 style={styles.subheading}> Services </h4>
                    <ul style={styles.list}>
                        <li style={styles.listItem}>Electrician</li>
                        <li style={styles.listItem}>Plumber</li>
                        <li style={styles.listItem}>Carpenter</li>
                        <li style={styles.listItem}>Tailor</li>
                        <li style={styles.listItem}>Maintenance</li>
                    </ul>
                </div>

                <div styles={styles.column}>
                    <h4 style={styles.subheading}> Company </h4>
                    <ul style={styles.list}>
                        <li style={styles.listItem}>About Us</li>
                        <li style={styles.listItem}>Contact</li>
                        <li style={styles.listItem}>Privacy Policy</li>
                        <li style={styles.listItem}>Terms & Conditions</li>
                    </ul>
                </div>

                <div style={styles.column}>
                    <h4 style={styles.subheading}> Connect </h4>
                    <p style={styles.text}>
                        ✉ support@urbansevices.com <br/>
                        ☎ +1 (555) 123-4567
                    </p>
                </div>

                <div style={styles.copyright}>
                    <div className={"container"}>
                        <p style={styles.copyrightText}> © 2023 Urban Services. All rights reserved. </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const styles = {
  footer: {
    backgroundColor: '#1f2937',
    color: 'white',
    marginTop: '80px',
  },
  footerContent: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '40px',
    padding: '60px 20px 40px',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
  heading: {
    fontSize: '20px',
    fontWeight: '700',
    marginBottom: '12px',
    color: '#6366f1',
  },
  subheading: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '16px',
  },
  text: {
    fontSize: '14px',
    color: '#d1d5db',
    lineHeight: '1.6',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    fontSize: '14px',
    color: '#d1d5db',
    marginBottom: '8px',
    cursor: 'pointer',
  },
  copyright: {
    borderTop: '1px solid #374151',
    padding: '24px 0',
  },
  copyrightText: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#9ca3af',
  },
};

export default Footer;