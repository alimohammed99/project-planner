<template>
    <div>
    
        <nav class="main__nav">
    
            <!-- Navigation links -->
    
            <router-link :to="{ name: 'home' }">Projects</router-link>
    
            <router-link :to="{ name: 'AddProject' }">Add Project</router-link>
    
        </nav>
    
    </div>
</template>

<script>
export default {};
</script>

<style>
/*The above router-links are anchor tags(a)*/
.main__nav{
    text-align: center;
    margin: 40px auto;
    padding:10px;
}
.main__nav a{
    display: inline-block; 
    text-decoration: none;
    margin: 0 10px;
    color: #999;
    font-size: 30px;
}

a.router-link-active {
    border-bottom: 7px solid #00ce89;
    padding-bottom:4px;
}

.main__nav a:hover {
    color:black;
}

</style>
