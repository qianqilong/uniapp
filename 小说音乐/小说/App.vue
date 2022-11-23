<script>
	export default {
		onLaunch: function() {
	
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* @import url('./common/style/common.css'); */
	@import url('./common/style/iconfont.css');
	@import url('./common/style/theme.css');
	@keyframes fadeInUp {
	  from {
	    opacity: 0; 
	    transform: translate3d(0, 100%, 0);
	  }
	
	  to {
	    opacity: 1;
	    transform: translate3d(0, 0, 0);
	  }
	}
	.container{
			width: 100%;
			height: calc(100vh - 70px);
			overflow: hidden;
			scroll-view{
				height: 100%;
				.animated {
					-webkit-animation-duration: 1s;
					animation-duration: 1s;
					-webkit-animation-fill-mode: both;
					animation-fill-mode: both;
				}
				.fadeInUp {
				  animation-name: fadeInUp;
				}
			}
		}
		
	
</style>
