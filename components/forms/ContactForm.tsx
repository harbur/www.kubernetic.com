import { Form, FormButton, FormInput, FormTextArea, Header, Input, Segment } from "semantic-ui-react";

export default function ContactForm() {
  return (
    <Segment style={{ textAlign: "left", paddingLeft: "30px", paddingRight: "30px", paddingTop: "30px" }}>
      <Header>Contact our sales team</Header>
      <form className="ui form" name="contact" method="POST" data-netlify="true">
        <FormInput label="Your Name" required type="text" name="name" id="name" />
        <FormInput label="Company Email" required type="email" name="email" id="email" />
        <FormInput label="Phone" required type="phone" name="phone" id="phone" />
        <FormInput label="Job Title" required type="text" name="job-title" id="job-title" />
        <FormInput label="Country" required type="text" name="country" id="country" />
        <FormTextArea rows={6} placeholder="Project details or questions" label="Comment" required name="comment" id="comment"  />
        <Input type="hidden" name="form-name" value="contact" />
        <FormButton type="submit">Send</FormButton>
      </form>
    </Segment>
  )
}
