<?php
	$presenter = new Illuminate\Pagination\BootstrapPresenter($paginator);
?>

<?php if ($paginator->getLastPage() > 1): ?>
	<ul class="pagination pull-left">
			<?php echo $presenter->render(); ?>
	</ul>
<?php endif; ?>
