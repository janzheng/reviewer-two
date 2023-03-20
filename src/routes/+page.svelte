
<svelte:head>
	<title>Reviewer Two</title>
</svelte:head>


<div class="_content">

  <h1>👀 Reviewer Two</h1>
  
	<form
		class=""
		method="post"
    enctype="multipart/form-data"
    use:enhance={({ form, data, action, cancel }) => {
      isLoading = true
      return async ({ result, update }) => {
        console.log('---> result', result)
        _resultsArr.push(result.data)
        _resultsArr = _resultsArr // reflex update
        isLoading = false
      };
    }}
	>
  
    <div class="Formlet mt-16" >
      <div class="Formlet Formlet-input _form-control _divider-bottom">
        <label for="url" class="_form-label | text-xl">Who do you want to look at your manuscript?</label>

        <div>
          <select name="persona" bind:value={selected} >
            {#each personas as persona}
              <option value={persona.text}>
                {persona.text}
              </option>
            {/each}
          </select>
        </div>
        <div class="subtext">
          <div class="pt-2">Get a fair review with <button class="_link" on:click|preventDefault={(e)=>{selected=personas[0].text}}>SCOR Card</button>.</div>
        </div>

        <div>
          <textarea name="text" bind:value={text} class="form-textarea mt-8 block w-full" rows="10" placeholder="Paste the article or abstract here"></textarea>
          <div class="text-sm text-gray-500 mt-2">
            {text.length} of 4000 text limit
          </div>  
        </div>
        
      </div>

      <!-- <input type="submit" value={`Ask ${selected.short}!`} class="Btn-outline my-4" on:click|preventDefault={getBlurb}>  -->
      <input type="submit" value={`Ask ${selectedPersona}!`} class="Btn-outline my-4 | text-xl | px-16 py-4" > {#if isLoading}
      <span class="pl-4">Asking {selectedPersona}...</span> {/if}
    </div>

  </form>


  {#if error}
    <div class="mt-8">error: { error }</div>
  {/if}
  
  {#if _resultsArr.length > 0}
    <div class="results mt-8 | md:grid md:grid-cols-2 md:gap-2">
      {#each _resultsArr.reverse() as _results}
        <div class="Card-light mt-2">
          <div class="mb-1">{_results?.persona}</div>
          <details class="mt-2" >
            <summary>Input: {_results.text.slice(0, 60)}...</summary>
            <p class="pl-4 pt-2">{_results.text}</p>
          </details>
          <details class="mt-2" open>
            <summary>Review:</summary>
            {#if _results?.persona.includes('SCOR')}
              <div class="SCORcard | pl-4">
                <div class="mb-4 | ">
                  <div class="font-bold">Significance: {_results.output?.scor?.significance?.score}</div>
                  <div>{_results.output?.scor?.significance?.explanation}</div>
                </div>
                <div class="mb-4 | ">
                  <div class="font-bold">Clarity: {_results.output?.scor?.clarity?.score}</div>
                  <div>{_results.output?.scor?.clarity?.explanation}</div>
                </div>
                <div class="mb-4 | ">
                  <div class="font-bold">Originality: {_results.output?.scor?.originality?.score}</div>
                  <div>{_results.output?.scor?.originality?.explanation}</div>
                </div>
                <div class="mb-8 | ">
                  <div class="font-bold">Rigor: {_results.output?.scor?.rigor?.score}</div>
                  <div>{_results.output?.scor?.rigor?.explanation}</div>
                </div>

                <!-- next section -->
                <div class="mb-2 | ">
                  <!-- <div><span class="font-bold">Strengths:</span> {_results.output.strengths}</div>
                  <div><span class="font-bold">Weaknesses:</span> {_results.output.strengths}</div> -->
                  <!-- <div><span class="font-bold">Future Direction:</span> {_results.output.future}</div> -->
                  <div><span class="font-bold">Future Direction:</span> {_results.output?.nextlevel}</div>
                </div>
              </div>
            {:else}
              <p class="pl-4 pt-2">{_results.output}</p>
            {/if}
          </details>
        </div>
      {/each}
    </div>
  {/if}



  <div class="Container Card | p-4 mt-16" >
    <div>
      If this is useful, please share it! 
    </div>
    <ul>
      <li class="list-disc list-inside">This experiment runs on ChatGPT and is <a href="https://twitter.com/yawnxyz" target="_blank">built by @yawnxyz</a></li>
      <li class="list-disc list-inside">If it stops working, it means it's run out of money! Please <a href="https://twitter.com/yawnxyz" target="_blank">tweet or DM me</a></li>
      <li class="list-disc list-inside">"SCOR Card" is based on this paper: <a href="https://arxiv.org/pdf/2109.09774.pdf" target="_blank">https://arxiv.org/pdf/2109.09774.pdf</a></li>
      <li class="list-disc list-inside">If you want more characters, want me to put more money into it, please also DM me</li>
      <li class="list-disc list-inside">Are you an editor or work for a journal, and want this as part of your workflow? DM or email me: jan@phage.directory</li>
    </ul>
  </div>
  
</div>




<!-- 


Reviewer number one is always constructive and provides useful feedback. Reviewer number three is usually a bit clueless and misses the point. But reviewer number two is the one you really have to watch out for - they're the harsh critic who always finds something wrong with your paper


 -->


<script>
	import { enhance } from '$app/forms';
  // import { fetchPost } from "$plasmid/utils/fetch-helpers"

  export let _resultsArr=[]; 
	let _results, instResults, error

  export let data;

	let personas = [
		{ short: `SCOR Card`, text: `SCOR Card: Get an objective evaluation and suggestions for your manuscript` },
		{ short: `Reviewer #1`, text: `Reviewer 1: Always constructive and provides useful feedback` },
		{ short: `Reviewer #2`, text: `Reviewer 2: Harsh critic who always finds something wrong with your paper` },
		{ short: `Reviewer #3`, text: `Reviewer 3: A bit clueless and misses the point` },
		{ short: `Yoda`, text: `Yoda from Star Wars. Strict but fair. Always finds a way to improve the manuscript.` },
		{ short: `Gandalf`, text: `Gandalf from Lord of the Rings` },
		{ short: `Homer Simpson`, text: `Homer Simpson from the Simpsons: Kind of clueless, but really nice!` },
		{ short: `Taylor`, text: `Write a song about the manuscript, in the style of Taylor Swift!` },
	];

	let selected = personas[2].text;
  let files, isLoading;

  let selectedPersona = personas.find(e=>e.text==selected)
  $: if(selected) {
    selectedPersona = personas.find(e=>e.text==selected).short
  }


  let text
  text = "Paste your manuscript or abstract here";

  text = "Determination of phage susceptibility as a clinical diagnostic tool: A routine perspective Valéry Daubie1,2, Houssein Chalhoub1,3, Bob Blasdel4, Hafid Dahma2, Maya Merabishvili5, Tea Glonti5, Nathalie De Vos6, Johan Quintens4, Jean-Paul Pirnay5, Marie Hallin3† and Olivier Vandenberg1,3,7*† 1Innovation and Business Development Unit, LHUB-ULB, Université Libre de Bruxelles, Brussels, Belgium 2Department of Microbiology, LHUB-ULB, Université Libre de Bruxelles, Brussels, Belgium 3Centre for Environmental Health and Occupational Health, School of Public Health, Université Libre de Bruxelles (ULB), Brussels, Belgium 4R&D department, Vesale Bioscience, Noville-sur-Mehaigne, Belgium 5Laboratory for Molecular and Cellular Technology, Queen Astrid Military Hospital, Brussels, Belgium 6Department of Clinical Chemistry, LHUB-ULB, Université Libre de Bruxelles, Brussels, Belgium 7Division of Infection and Immunity, Faculty of Medical Sciences, University College London, London, United Kingdom As the global burden of disease caused by multidrug resistant bacteria is a major source of concern, credible clinical alternatives to antibiotic therapy, such as personalized phage therapy, are actively explored. Although phage therapy has been used for more than a century, the issue of an easy to implement diagnostic tool for determining phage susceptibility that meets current routine clinical needs is still open. In this Review, we summarize the existing methods used for determining phage activity on bacteria, including the three reference methods: the spot test, the double agar overlay plaque assay, and the Appelmans method. The first two methods rely on the principle of challenging the overnight growth of a lawn of bacteria in an agar matrix to a known relative phage to bacteria concentration and represent good screening tools to determine if the tested phage can be used for a “passive” and or “active” treatment. Beside these methods, several techniques, based on “real-time” growth kinetics assays (GKA) have been developed or are under development. They all monitor the growth of clinical isolates in the presence of phages, but use various detection methods, from classical optical density to more sophisticated techniques such as computer-assisted imagery, flow-cytometry, quantitative real-time polymerase chain reaction (qPCR) or metabolic indicators. Practical considerations as well as information provided about phage activity are reviewed for each technique. Finally, we also discuss the analytical and interpretative requirements for the implementation of a phage susceptibility testing tool in routine clinical microbiology."

</script>









