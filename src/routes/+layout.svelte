<script>
	// Required for using tailwindcss, which itself is a dependency of daisyui
	// See: https://tailwindcss.com/docs/guides/sveltekit
	import '../app.css';
</script>

<div class="navbar bg-base-100 px-8">
  <div class="flex-1">
    <a href="/" class="btn btn-ghost normal-case text-xl">Finance Tracker</a>
  </div>
  <div class="flex-none gap-2">
    <ul class="menu menu-horizontal px-1">
      <li><a>About</a></li>
    </ul>
    <div class="dropdown dropdown-end">
      <label tabindex="0" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img src="https://placeimg.com/80/80/people" />
        </div>
      </label>
      <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <a>Profile</a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>

<slot />
