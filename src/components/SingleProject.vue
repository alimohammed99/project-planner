<template>
    <div class="project">
    
        <div class="actions">
    
            <h1 title="Click to display project title" @click="toggleShowProjectsDetails" style="color: indigo">
    
                {{ allProjects.title }}
    
            </h1>
    
    
    
            <div class="icons">
    
                <span class="material-icons">edit</span>
    
    
    
                <span class="material-icons"> delete </span>
    
    
    
                <span class="material-icons"> done </span>
    
            </div>
    
        </div>
    
    
    
        <div v-if="showProjectsDetails" class="details">
    
            <p style="font-size: 25px; color: brown">
    
                <em>{{ allProjects.details }}</em>
    
            </p>
    
        </div>
    
    </div>
</template>

<script>
export default {
    props: ['allProjects', 'bigDiv'],

    data() {
        return {
            showProjectsDetails: false
        }
    },

    mounted() {},

    methods: {
        // Projects details aren't gonna show unless User clicks on the projects titles and User can toggle btw hiding and showing the projects details.

        toggleShowProjectsDetails() {
            this.showProjectsDetails = !this.showProjectsDetails
        }
    }
}
</script>

<style>
/* I gave both the 'mother-div' and the 'child-div' same stylings, so it's gonna be like a double-styling in the interface. */

.project,
.projectDiv {
    margin: 20px auto;
    background: white;
    padding: 10px 20px;
    border-radius: 4px;
    /*box-shadow: 7px 7px 3px rgba(128, 128, 128);*/
    box-shadow: 10px 10px 3px rgba(36, 17, 17, 0.1);
    border-left: 7px solid #e90074;
}

h1 {
    cursor: pointer;
}

.actions{
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.material-icons{
    font-size: 30px;
    margin-left: 10px;
    color: #bbb;
    cursor: pointer;
}

.material-icons:hover {
    color: #777;
}
</style>
