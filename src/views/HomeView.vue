<template>
  <div class="home">
    <!-- Wanna display the items ('projects') only if the project array has a length i.e, has data inside. Coz there's no point cycling through the array if it's empty. -->
    <div v-if="projects.length">
      <div class="projectDiv" v-for="project in projects" :key="project.id">
        <!-- For loops in VUE must have a key attribute, and it must be unique for each item. That's why I picked the id. ID is unique. -->

        <!-- I externalized this template into a separate component (reusable) component. This is because I'm not just gonna display only job title or something. Each project should have a bit more template. I could've done it here though. -->

        <!-- This is the single reusable component to display the projects. -->
        <!-- "project" is derived from the for-loop. -->
        <SingleProject :allProjects="project" :bigDiv="projectDiv" />
        <!-- "projectDiv" is the class name of this mother-div. So I'm sending it as a prop to the 'singleProject.vue' because I want to style it there. That shows css class names can be sent as props. -->
      </div>
    </div>

    <div v-else>
      <p style="font-size: 90px; color: tomato">Loading.....</p>
    </div>
  </div>
</template>

<script>
import SingleProject from "../components/SingleProject.vue";

export default {
  name: "HomeView",
  components: { SingleProject },
  data() {
    return {
      // Since I want to get the data from another place (json file) and use it here, the best place/time to enable/get it is inside the mounted() lifecycle. That's why when the component has been mounted to the DOM.
      projects: [],
    };
  },
  mounted() {
    // I used Fetch API. I need to pass in the endpoint which was provided by the json server to get all the jobs. Now this is gonna fetch all the data for me and return them in json format.
    // The below function is asynchronous and therefore returns a Promise.
    fetch(" http://localhost:3000/projects")
      // The below function fires a callback function after the above function is done.
      // The below is necessary in order to actually get that data and pass into Javascript, I need to take Response.
      // This is asynchronous and therefore also returns a Promise.
      .then((res) => res.json())

      // This is just to populate whatever data in the 'jobs' array inside "data".
      .then((data) => (this.projects = data))

      // This is needed incase there's any error with the asynchronous tasks up there.
      .catch((err) => console.log(err.message));
  },
};
</script>
