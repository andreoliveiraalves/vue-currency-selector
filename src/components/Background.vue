<template>
    <div class="background-container">
        <div class="gradient-bg"></div>
        <div class="mesh-overlay"></div>
    </div>
</template>

<script>
export default {
    name: 'Background'
}
</script>

<style scoped>
.background-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    overflow: hidden;
}

.gradient-bg {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg,
            #667eea 0%,
            #5b5eb1 30%,
            #4c4c9d 60%,
            #3b3c7c 100%);
    background-size: 400% 400%;
    animation: gradientShift 15s ease infinite;
    position: absolute;
    top: 0;
    left: 0;
}

.mesh-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image:
        radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 50% 100%, rgba(102, 126, 234, 0.1) 0%, transparent 50%);
    animation: meshMove 40s ease-in-out infinite;
}

@keyframes gradientShift {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

@keyframes meshMove {

    0%,
    100% {
        transform: translateX(0) translateY(0);
    }

    25% {
        transform: translateX(-20px) translateY(-10px);
    }

    50% {
        transform: translateX(10px) translateY(-20px);
    }

    75% {
        transform: translateX(-5px) translateY(15px);
    }
}
</style>
