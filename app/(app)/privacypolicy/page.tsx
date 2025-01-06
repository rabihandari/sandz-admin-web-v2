'use client';

// pages/privacy-policy.js
import React from "react";
import {
  Typography,
  Container,
  Box,
  List,
  ListItem,
  Link as MuiLink,
  Divider,
} from "@mui/material";

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Privacy Policy
      </Typography>

      <Typography paragraph>
        This privacy policy applies to the Sandz app (hereby referred to as
        &quot;Application&quot;) for mobile devices that was created by Rabih Andari
        (hereby referred to as &quot;Service Provider&quot;) as a Commercial service.
        This service is intended for use &quot;AS IS&quot;.
      </Typography>

      <Typography variant="h5" component="h2" gutterBottom>
        Information Collection and Use
      </Typography>
      <Typography paragraph>
        The Application collects information when you download and use it. This
        information may include information such as:
      </Typography>
      <List>
        <ListItem>
          Your first name and last name
        </ListItem>
        <ListItem>
          Your mobile number
        </ListItem>
        <ListItem>
          Your Google account email address
        </ListItem>
        <ListItem>
          Your ID photo - Frond and back
        </ListItem>
        <ListItem>
          Your location (Optional). Your location will be used to help vendors reach out to you and deliver you order without running into navigation problems
        </ListItem>
        <ListItem>
          The pages of the Application that you visit, the time and date of
          your visit, the time spent on those pages
        </ListItem>
        <ListItem>The time spent on the Application</ListItem>
        <ListItem>The operating system you use on your mobile device</ListItem>
      </List>
      <Typography paragraph>
        The Application does not gather precise information about the location
        of your mobile device.
      </Typography>

      <Typography paragraph>
        The Service Provider may use the information you provided to contact
        you from time to time to provide you with important information,
        required notices, and marketing promotions.
      </Typography>
      <Typography paragraph>
        For a better experience, while using the Application, the Service
        Provider may require you to provide certain personally identifiable
        information, including but not limited to Email address, gender, ID
        photos, age, First name, last name. The information that the Service
        Provider request will be retained by them and used as described in this
        privacy policy.
      </Typography>

      <Typography variant="h5" component="h2" gutterBottom>
        Third Party Access
      </Typography>
      <Typography paragraph>
        Only aggregated, anonymized data is periodically transmitted to external
        services to aid the Service Provider in improving the Application and
        their service. The Service Provider may share your information with
        third parties in the ways that are described in this privacy statement.
      </Typography>
      <Typography paragraph>
        Below are the links to the Privacy Policy of the third-party service
        providers used by the Application:
      </Typography>
      <List>
        <ListItem>
          <MuiLink
            href="https://www.google.com/policies/privacy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Play Services
          </MuiLink>
        </ListItem>
        <ListItem>
          <MuiLink
            href="https://firebase.google.com/support/privacy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Firebase Crashlytics
          </MuiLink>
        </ListItem>
      </List>

      <Typography variant="h5" component="h2" gutterBottom>
        Opt-Out Rights
      </Typography>
      <Typography paragraph>
        You can stop all collection of information by the Application easily by
        uninstalling it. You may use the standard uninstall processes as may be
        available as part of your mobile device or via the mobile application
        marketplace or network.
      </Typography>

      <Typography variant="h5" component="h2" gutterBottom>
        Data Retention Policy
      </Typography>
      <Typography paragraph>
        The Service Provider will retain User Provided data for as long as you
        use the Application and for a reasonable time thereafter. If you&apos;d like
        them to delete User Provided Data that you have provided via the
        Application, please contact them at{" "}
        <MuiLink href="mailto:rabihthejunior@gmail.com">
          rabihthejunior@gmail.com
        </MuiLink>{" "}
        and they will respond in a reasonable time.
      </Typography>

      <Typography variant="h5" component="h2" gutterBottom>
        Children
      </Typography>
      <Typography paragraph>
        The Service Provider does not use the Application to knowingly solicit
        data from or market to children under the age of 13. If you are a parent
        or guardian and you are aware that your child has provided personal
        information, please contact the Service Provider so that they will be
        able to take the necessary actions.
      </Typography>

      <Typography variant="h5" component="h2" gutterBottom>
        Security
      </Typography>
      <Typography paragraph>
        The Service Provider is concerned about safeguarding the confidentiality
        of your information. The Service Provider provides physical,
        electronic, and procedural safeguards to protect information the Service
        Provider processes and maintains.
      </Typography>

      <Typography variant="h5" component="h2" gutterBottom>
        Changes
      </Typography>
      <Typography paragraph>
        This Privacy Policy may be updated from time to time for any reason.
        The Service Provider will notify you of any changes to the Privacy
        Policy by updating this page with the new Privacy Policy. You are
        advised to consult this Privacy Policy regularly for any changes, as
        continued use is deemed approval of all changes.
      </Typography>

      <Typography paragraph>This privacy policy is effective as of 2025-01-06</Typography>

      <Typography variant="h5" component="h2" gutterBottom>
        Your Consent
      </Typography>
      <Typography paragraph>
        By using the Application, you are consenting to the processing of your
        information as set forth in this Privacy Policy now and as amended by
        us.
      </Typography>

      <Typography variant="h5" component="h2" gutterBottom>
        Contact Us
      </Typography>
      <Typography paragraph>
        If you have any questions regarding privacy while using the Application,
        or have questions about the practices, please contact the Service
        Provider via email at{" "}
        <MuiLink href="mailto:rabihthejunior@gmail.com">
          rabihthejunior@gmail.com
        </MuiLink>
        .
      </Typography>

      <Divider sx={{ my: 4 }} />
      <Typography paragraph>
        This privacy policy page was generated by{" "}
        <MuiLink
          href="https://app-privacy-policy-generator.nisrulz.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          App Privacy Policy Generator
        </MuiLink>
      </Typography>
    </Container>
  );
};

export default PrivacyPolicy;
