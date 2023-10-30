<div style="padding-top: 80px;" class="flex-grow flex flex-col items-center gap-8 p-8">
	<article class="thick-black-border comic-shadow w-full p-4 bg-white font-medium mb-8" style="max-width: 600px;">
		<p class="pb-2">
			I've been working for a small tech company called <span style="color: rgb(44 167 216);" class="font-bold">Swimage</span> for about <span class="font-bold">two years</span>.
		</p>
		<p class="pb-2">
			I've mostly worked on a web portal that allows clients to view and configure the Swimage software on all their computers. It is used by all of their customers and is an important tool for the Swimage software.
		</p>
		<p>
			I designed all of the UI in the portal myself, and it uses Vue and php.
		</p>
	</article>
	<div class="self-center flex flex-col items-stretch w-96 thick-black-border">
		<div class="project-title p-2 bg-lighter text-center font-IBMPlexMono font-bold text-xl">
			Screenshots
		</div>
	</div>
	<article class="thick-black-border comic-shadow flex flex-col w-full p-4 font-medium" style="max-width: 900px;">
		<h3 class="font-bold font-IBMPlexMono">Assets Page</h3>
		<p class="pt-2 pb-4">Here, users can see all of the computers they have access to. All of the important information about a computer can be viewed on the portal.</p>
		<img class="w-full" src={assets} alt="Assets page">
	</article>
	<article class="thick-black-border comic-shadow flex flex-col w-full p-4 font-medium" style="max-width: 900px;">
		<h3 class="font-bold font-IBMPlexMono">Actions and Rules</h3>
		<p class="pt-2 pb-4">Here an Action has been assigned to a computer on the portal. Rules can also assigned to computers and Collections. Rules are automation that run an Action when a certain condition is met.</p>
		<img class="w-full" src={actions} alt="Action tab">
	</article>
	<article class="thick-black-border comic-shadow flex flex-col w-full p-4 font-medium" style="max-width: 900px;">
		<h3 class="font-bold font-IBMPlexMono">Collections</h3>
		<p class="pt-2 pb-4">This is where user can change the query of a Collection. Computers are automatically added to this Collection if they match the query, and the query can be made up of many conditions. </p>
		<img class="w-full" src={collections} alt="Collection page">
	</article>
	<article class="thick-black-border comic-shadow flex flex-col w-full p-4 font-medium" style="max-width: 900px;">
		<h3 class="font-bold font-IBMPlexMono">Organizations</h3>
		<p class="pt-2 pb-4">This is the list of Organizations. Every computer belongs to one Organization and User Groups can be assigned specific permissions to each Organization.</p>
		<img class="w-full" src={orgs} alt="Organization page">
	</article>
</div>
<script>
import assets from '$lib/assets/imgs/portalexamples/Assets.jpg';
import collections from '$lib/assets/imgs/portalexamples/Collections.jpg';
import orgs from '$lib/assets/imgs/portalexamples/Orgs.jpg';
import actions from '$lib/assets/imgs/portalexamples/Action.jpg';
</script>